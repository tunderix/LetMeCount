import {
  Discord,
  SimpleCommand,
  SimpleCommandMessage,
  SimpleCommandOption,
} from 'discordx';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

@Discord()
class TimerCommand {
  @SimpleCommand('timer')
  async timer(
    @SimpleCommandOption('seconds', { type: 'NUMBER' })
    seconds: number | undefined,
    command: SimpleCommandMessage
  ) {
    const user = command.message.member?.displayName;

    if (!seconds) return;
    command.message.reply(`Started counting..` + user);
    await delay(seconds * 1000);
    command.message.reply(`waited ` + seconds + ` seconds`);
  }
}
