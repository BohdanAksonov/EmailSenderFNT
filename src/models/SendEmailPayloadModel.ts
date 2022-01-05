import ReceiverModel from "./ReceiverModel";

class SendEmailPayloadModel {
  constructor(
    public receivers: Array<ReceiverModel>,
    public emailTemplate: string,
    public subject: string
  ) {}
}

export default SendEmailPayloadModel;