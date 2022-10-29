import {
  CommandPermissionLevel,
  PlayerCommandSelector,
} from "bdsx/bds/command";
import { command } from "bdsx/command";
import { CommandResultType } from "bdsx/commandresult";
import { bedrockServer } from "bdsx/launcher";
import * as fs from "fs";
import { connectionList } from "./net-login";
import { events } from "bdsx/event";
import { ipfilter } from "bdsx/core";
let path = "./ban.json";
if (!fs.existsSync(path))
  fs.writeFileSync(path, JSON.stringify({ masterData: [] }), "utf8");

command
  .register(
    "ban",
    "ipBan" /* Command permision */,
    CommandPermissionLevel.Operator
  )
  .overload(
    (p, o, op) => {
      const result = bedrockServer.executeCommand(
        "kick " + p.target.getName(),
        CommandResultType.Data
      );
      let data: any;
      if (result.result == 1) {
        for (const ni of connectionList.keys()) {
          const actor = ni.getActor();
          if (actor?.isPlayer() && actor?.getName() == p.target.getName()) {
            data = {
              ip: ni.getAddress().split("|")[0],
              name: actor.getName(),
            };
            bedrockServer.executeCommand(
              `tellraw @a {"rawtext":[{"text":"§l§f${o
                .getEntity()
                ?.getName()} §ckicked §f${actor.getName()}"}]}`
            );
            ipfilter.add(ni.getAddress().split("|")[0]);
          }
        }
        let data_arr: any[] = JSON.parse(
          fs.readFileSync(path, "utf8")
        ).masterData;
        data_arr.push(data);
        let masterData: string = JSON.stringify(
          { masterData: data_arr },
          null,
          " "
        );
        fs.writeFileSync(path, masterData);
      }
    },
    {
      target: PlayerCommandSelector,
    }
  );

events.playerJoin.on((ev) => {
  let jsonObject = JSON.parse(fs.readFileSync(path, "utf8")).masterData;
  for (const ni of connectionList.keys()) {
    const actor = ni.getActor();
    if (actor?.getName() == ev.player.getName()) {
      jsonObject.filter((item: any) => {
        if (ni.getAddress().split("|")[0] == item.ip) {
          bedrockServer.executeCommand(
            `kick "${ev.player.getName()}"`,
            CommandResultType.Data
          );
          ipfilter.add(item.ip);
        }
      });
    }
  }
});
