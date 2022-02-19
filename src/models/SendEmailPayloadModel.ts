import CredentialModel from "./CredentialModel";
import ReceiverModel from "./ReceiverModel";

class SendEmailPayloadModel {
  constructor(
    public receivers: Array<ReceiverModel>,
    public emailTemplate: string,
    public subject: string,
    public credential: CredentialModel,
    public from: string
  ) {}
}

export default SendEmailPayloadModel;
