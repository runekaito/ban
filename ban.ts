import { command } from "bdsx/command";
import { ipfilter } from "bdsx/core";
import { CxxString, int32_t } from "bdsx/nativetype";
import { connectionList } from "./example_and_test/net-login";
import * as fs from "fs";
import { events } from "bdsx/event";
import { getNameOfDeclaration } from "typescript";

let jsonObject: any;
var masterData: {
  name: string;
  ip: any;
}[] = [];
let jsi: object;
command.register("ban", "ip ban").overload(
  (p, o, op) => {
    for (const ni of connectionList.keys()) {
      const actor = ni.getActor();
      if (actor?.isPlayer() && actor?.getName() == p.name) {
        var ip1 = ni.getAddress();
        var data = {
          name: actor.getName(),
          ip: ip1,
        };
        masterData.push(data);
        let masterData2: string = JSON.stringify({ masterData }, null, " ");
        fs.writeFileSync("./ban-ip.json", masterData2);
        ipfilter.add(ip1);
      }
    }
  },
  {
    name: CxxString,
  }
);
command.find("ban").signature.permissionLevel = CommandPermissionLevel.Operator;

events.serverOpen.on(() => {
  jsonObject = JSON.parse(fs.readFileSync("./ban-ip.json", "utf8"));
  jsi =
    jsonObject.masterData.filter(() => {
      true;
    }) || {};
  for (const i in jsi) {
    ipfilter.add(jsi[i].ip);
  }
});
