"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const core_1 = require("bdsx/core");
const nativetype_1 = require("bdsx/nativetype");
const net_login_1 = require("./net-login");
const fs = require("fs");
const event_1 = require("bdsx/event");
let jsonObject;
var masterData = [];
let jsi;
command_1.command.register("ban", "ip ban").overload((p, o, op) => {
    for (const ni of net_login_1.connectionList.keys()) {
        const actor = ni.getActor();
        if ((actor === null || actor === void 0 ? void 0 : actor.isPlayer()) && (actor === null || actor === void 0 ? void 0 : actor.getName()) == p.name) {
            var ip1 = ni.getAddress();
            var data = {
                name: actor.getName(),
                ip: ip1,
            };
            masterData.push(data);
            let masterData2 = JSON.stringify({ masterData }, null, " ");
            fs.writeFileSync("./ban-ip.json", masterData2);
            core_1.ipfilter.add(ip1);
        }
    }
}, {
    name: nativetype_1.CxxString,
});
event_1.events.serverOpen.on(() => {
    jsonObject = JSON.parse(fs.readFileSync("./ban-ip.json", "utf8"));
    jsi =
        jsonObject.masterData.filter(() => {
            true;
        }) || {};
    for (const i in jsi) {
        core_1.ipfilter.add(jsi[i].ip);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLG9DQUFxQztBQUNyQyxnREFBcUQ7QUFDckQsMkNBQTZDO0FBQzdDLHlCQUF5QjtBQUN6QixzQ0FBb0M7QUFHcEMsSUFBSSxVQUFlLENBQUM7QUFDcEIsSUFBSSxVQUFVLEdBR1IsRUFBRSxDQUFDO0FBQ1QsSUFBSSxHQUFXLENBQUM7QUFDaEIsaUJBQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FDeEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ1gsS0FBSyxNQUFNLEVBQUUsSUFBSSwwQkFBYyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsRUFBRSxLQUFJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLE9BQU8sRUFBRSxLQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDbkQsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzFCLElBQUksSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUNyQixFQUFFLEVBQUUsR0FBRzthQUNSLENBQUM7WUFDRixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksV0FBVyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDL0MsZUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjtLQUNGO0FBQ0gsQ0FBQyxFQUNEO0lBQ0UsSUFBSSxFQUFFLHNCQUFTO0NBQ2hCLENBQ0YsQ0FBQztBQUVGLGNBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRTtJQUN4QixVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLEdBQUc7UUFDRCxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDaEMsSUFBSSxDQUFDO1FBQ1AsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ1gsS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUU7UUFDbkIsZUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekI7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9