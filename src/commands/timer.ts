import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
} from 'discordx';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const concurrent: string[] = [];

@Discord()
class TimerCommand {
  @SimpleCommand('timer')
  async timer(
    @SimpleCommandOption('seconds', { type: 'NUMBER' })
    seconds: number | undefined,
    command: SimpleCommandMessage,
  ) {
    const user = command.message.member?.displayName;
    if (!seconds || !user) return;

    concurrent.push(user);
    command.message.reply(`Started counting..` + user);
    await delay(seconds * 1000);
    concurrent.pop();
    command.message.reply(`waited ` + seconds + ` seconds`);
  }


  @SimpleCommand('all')
  async all(
      command: SimpleCommandMessage,
  ) {
    let str = "";
    for(let user in concurrent){
      str += user;
    }
    command.message.reply(`all: ` + str);
  }
}