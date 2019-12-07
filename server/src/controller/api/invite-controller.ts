import {Request, Response} from "express";
import {OK, UNPROCESSABLE_ENTITY} from "../../controller/api/common/status-code";
import {Invite} from "../../domain/entity/Invite";
import {Inviter} from "../../model/invite/inviter";
import {EmailNotifier} from "../../model/notifier/email-notifier";
import {InviteNotifier} from "../../model/notifier/invite-notifier";
import {FAIL_INVITE, FOUND_INVITATIONS, SUCCESS_INVITE} from "./common/messages";
import {isLongerThan} from "../../utils/array-helper";
import ResponseForm from "../../utils/response-form";
import UrlInfo from "../../utils/url-info";
import {Invitee} from "../../model/invite/invitee";
import {Ticket} from "../../domain/vo/Ticket";

export const invite = async (request: Request, response: Response): Promise<void> => {
  const {snugId, emails} = request.body;
  const inviter = new Inviter(new EmailNotifier(), new InviteNotifier());
  const invitations = await inviter.invite(snugId, emails);
  if(isLongerThan(invitations, 0)) {
    response.status(OK)
            .json(ResponseForm.of<object>(SUCCESS_INVITE, {invitations}));
  } else {
    response.status(UNPROCESSABLE_ENTITY)
            .json(ResponseForm.of<object>(FAIL_INVITE,{invitations}));
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
  const invite = await Invite.findOneWithSnugByTicket(new Ticket(ticket));
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