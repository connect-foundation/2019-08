import { NextFunction, Request, Response } from "express";
import {
  ACCEPTED,
  CONFLICT,
  FORBIDDEN,
  OK,
  UNPROCESSABLE_ENTITY
} from "http-status-codes";
import { Inviter } from "../../model/invite/inviter";
import { EmailNotifier } from "../../model/notifier/email-notifier";
import { InviteNotifier } from "../../model/notifier/invite-notifier";
import {
  ALREADY_JOINED_SNUG,
  FOUND_INVITATIONS,
  INVALID_TICKET,
  NOT_FOUND,
  SUCCESS_INVITE,
  SUCCESS_JOIN_SNUG,
  SUCCESS_REJECT_INVITATION_SNUG
} from "./common/messages";
import ResponseForm from "../../utils/response-form";
import UrlInfo from "../../utils/url-info";
import { Invitee } from "../../model/invite/invitee";
import { Ticket } from "../../domain/vo/Ticket";

export const invite = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { snugId } = request.params;
  const { emails } = request.body;
  const inviter = new Inviter(new EmailNotifier(), new InviteNotifier());
  try {
    const invitations = await inviter.invite(snugId, emails);
    response.status(OK).json(
      ResponseForm.of<object>(SUCCESS_INVITE, { invitations })
    );
  } catch (error) {
    response.status(UNPROCESSABLE_ENTITY).json(
      ResponseForm.of<object>(NOT_FOUND, {
        link: UrlInfo.aboutHome(),
        invitations: []
      })
    );
  }
};

export const findInvitations = async (
  request: Request,
  response: Response
): Promise<void> => {
  const { userId } = request.params;
  const invitee = new Invitee();
  const invitations = await invitee.findInvitations(Number(userId));
  response.status(OK).json(
    ResponseForm.of<object>(FOUND_INVITATIONS, { invitations })
  );
};

export const verify = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { ticket } = request.params;
  const { agree } = request.body;
  const ticketModel = Ticket.from(ticket);
  const invitee = new Invitee();
  try {
    request["snug"] = await invitee.joinSnug(ticketModel, agree);
  } catch (error) {
    request["invite_snug"] = await invitee.findInvitationByTicket(ticketModel);
  } finally {
    next();
  }
};

export const redirectBySnug = (request: Request, response: Response): void => {
  const snug = request["snug"] || request["invite_snug"];
  if (!!snug) {
    return response.redirect(snug.link);
  }

  response.redirect(UrlInfo.aboutHome());
};

export const responseBySnug = (
  request: Request,
  response: Response
): Response => {
  const { agree } = request.body;
  const snug = request["snug"];
  const inviteSnug = request["invite_snug"];
  if (!!snug) {
    if (agree) {
      return response.status(ACCEPTED).json(
        ResponseForm.of<object>(SUCCESS_JOIN_SNUG, { snug: snug })
      );
    } else {
      return response.status(ACCEPTED).json(
        ResponseForm.of<object>(SUCCESS_REJECT_INVITATION_SNUG, {
          snug: { link: UrlInfo.aboutHome() }
        })
      );
    }
  } else if (!!inviteSnug) {
    return response.status(CONFLICT).json(
      ResponseForm.of<object>(ALREADY_JOINED_SNUG, { snug: inviteSnug })
    );
  }

  return response.status(FORBIDDEN).json(
    ResponseForm.of<object>(INVALID_TICKET, {
      snug: { link: UrlInfo.aboutHome() }
    })
  );
};
