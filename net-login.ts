
// Network Hooking: Get login IP and XUID
// This file is a copy of one of the BDSX example files. Thanks to the developers of BDSX.
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { BuildPlatform } from "bdsx/common";
import { events } from "bdsx/event";

export const connectionList = new Map<NetworkIdentifier, string>();

events.packetAfter(MinecraftPacketIds.Login).on((ptr, networkIdentifier, packetId) => {
    const ip = networkIdentifier.getAddress();
    const connreq = ptr.connreq;
    if (connreq === null) return; // wrong client
    const cert = connreq.getCertificate();
    if (cert === null) return; // wrong client ?
    const xuid = cert.getXuid();
    const username = cert.getId();

    // sendLog
    console.log(`Connection: ${username}> IP=${ip}, XUID=${xuid}, PLATFORM=${BuildPlatform[connreq.getDeviceOS()] || 'UNKNOWN'}`);
    if (username) connectionList.set(networkIdentifier, username);
});

events.playerJoin.on(ev=>{
    ev.player.runCommand("tag @s add join")
});
