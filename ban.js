"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("bdsx/command");
const core_1 = require("bdsx/core");
const nativetype_1 = require("bdsx/nativetype");
const net_login_1 = require("./example_and_test/net-login");
const fs = require("fs");
const event_1 = require("bdsx/event");
const command_2 = require("bdsx/bds/command");
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
command_1.command.find("ban").signature.permissionLevel = command_2.CommandPermissionLevel.Operator;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQXVDO0FBQ3ZDLG9DQUFxQztBQUNyQyxnREFBcUQ7QUFDckQsMkNBQTZDO0FBQzdDLHlCQUF5QjtBQUN6QixzQ0FBb0M7QUFFcEMsOENBQTBEO0FBRTFELElBQUksVUFBZSxDQUFDO0FBQ3BCLElBQUksVUFBVSxHQUdSLEVBQUUsQ0FBQztBQUNULElBQUksR0FBVyxDQUFDO0FBQ2hCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQ3hDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtJQUNYLEtBQUssTUFBTSxFQUFFLElBQUksMEJBQWMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN0QyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLEVBQUUsS0FBSSxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxPQUFPLEVBQUUsS0FBSSxDQUFDLENBQUMsSUFBSSxFQUFFO1lBQ25ELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUMxQixJQUFJLElBQUksR0FBRztnQkFDVCxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsRUFBRSxFQUFFLEdBQUc7YUFDUixDQUFDO1lBQ0YsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLFdBQVcsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3BFLEVBQUUsQ0FBQyxhQUFhLENBQUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQy9DLGVBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkI7S0FDRjtBQUNILENBQUMsRUFDRDtJQUNFLElBQUksRUFBRSxzQkFBUztDQUNoQixDQUNGLENBQUM7QUFDRixpQkFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLGdDQUFzQixDQUFDLFFBQVEsQ0FBQztBQUNoRixjQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUU7SUFDeEIsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRSxHQUFHO1FBQ0QsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ2hDLElBQUksQ0FBQztRQUNQLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNYLEtBQUssTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFO1FBQ25CLGVBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pCO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==