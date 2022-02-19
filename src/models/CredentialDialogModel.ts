import CredentialModel from "@/models/CredentialModel";

class CredentialDialogModel {
  constructor(
    public credential: CredentialModel,
    public subject: string,
    public from: string
  ) {}
}

export default CredentialDialogModel;
