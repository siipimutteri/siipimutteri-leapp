import { LeappCommand } from "../../leapp-command";
import { Config } from "@oclif/core/lib/config/config";

export default class ChangeSessionProfile extends LeappCommand {
  static description = "Login to your Team account";

  static examples = [`$leapp team login`];

  static flags = {};

  constructor(argv: string[], config: Config) {
    super(argv, config);
  }

  async run(): Promise<void> {
    try {
      await this.login();
    } catch (error) {
      this.error(error instanceof Error ? error.message : `Unknown error: ${error}`);
    }
  }

  async insertUserEmail(): Promise<string> {
    const answer: any = await this.cliProviderService.inquirer.prompt([
      {
        name: "userEmail",
        message: "insert your email",
        type: "input",
      },
    ]);
    return answer.userEmail;
  }

  async insertUserPassword(): Promise<string> {
    const answer: any = await this.cliProviderService.inquirer.prompt([
      {
        name: "userPassword",
        message: "insert your password",
        type: "password",
      },
    ]);
    return answer.userPassword;
  }

  async login(): Promise<void> {
    const userEmail = await this.insertUserEmail();
    const userPassword = await this.insertUserPassword();
    try {
      const user = await this.cliProviderService.leappTeamCoreUserProvider.signIn(userEmail, userPassword);
      this.log(JSON.stringify(user));
    } catch (error) {
      this.error(error instanceof Error ? error.message : `Unknown error: ${error}`);
    }
  }
}
