import {Request, Response} from "express";
import {OK, UNPROCESSABLE_ENTITY} from "http-status-codes";
import {Invite} from "../../domain/entity/Invite";
import {Inviter} from "../../model/invite/inviter";
import {EmailNotifier} from "../../model/notifier/email-notifier";
import {InviteNotifier} from "../../model/notifier/invite-notifier";
import {FOUND_INVITATIONS, NOT_FOUND, SUCCESS_INVITE} from "./common/messages";
import ResponseForm from "../../utils/response-form";
import UrlInfo from "../../utils/url-info";
import {Invitee} from "../../model/invite/invitee";
import {Ticket} from "../../domain/vo/Ticket";

export const invite = async (request: Request, response: Response): Promise<void> => {
  const {snugId} = request.params;
  const {emails} = request.body;
  const inviter = new Inviter(new EmailNotifier(), new InviteNotifier());
  try {
    const invitations = await inviter.invite(snugId, emails);
    response.status(OK)
            .json(ResponseForm.of<object>(SUCCESS_INVITE, {invitations}));
  } catch(error) {
    response.status(UNPROCESSABLE_ENTITY)
            .json(ResponseForm.of<object>(NOT_FOUND,{link: UrlInfo.aboutHome(), invitations: []}));
  }
};

const findOutUrlToRedirect = (invite: Invite): string => {
  if(!!invite) {
    return UrlInfo.aboutSnugById(invite.snug.id);
  }

  return UrlInfo.aboutHome();
};

export const verify = async (request: Request, response: Response): Promise<void> => {
  const {ticket} = request.params;
  const invite = await Invite.findOneWithSnugByTicket(Ticket.from(ticket));
  const urlToRedirect = findOutUrlToRedirect(invite);
  response.redirect(urlToRedirect);
};

export const findInvitations = async (request: Request, response: Response): Promise<void> => {
  const {userId} = request.params;
  const invitee = new Invitee();
  const invitations = await invitee.findInvitations(userId);
  response.status(OK)
          .json(ResponseForm.of<object>(FOUND_INVITATIONS, {invitations}));
};