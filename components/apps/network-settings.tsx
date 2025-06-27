"use client"

import { useState } from "react"

export default function NetworkSettings() {
  const [selectedAdapter, setSelectedAdapter] = useState("wifi")
  const [ipAddress, setIpAddress] = useState("192.168.1.100")
  const [subnetMask, setSubnetMask] = useState("255.255.255.0")
  const [gateway, setGateway] = useState("192.168.1.1")
  const [dns1, setDns1] = useState("8.8.8.8")
  const [dns2, setDns2] = useState("8.8.4.4")
  const [dhcpEnabled, setDhcpEnabled] = useState(true)

  const networkAdapters = [
    { id: "wifi", name: "Wireless Network Adapter", status: "Connected", icon: "📶" },
    { id: "ethernet", name: "Ethernet Adapter", status: "Disconnected", icon: "🔌" },
    { id: "dialup", name: "Dial-up Modem", status: "Not Available", icon: "📞" },
  ]

  const wifiNetworks = [
    { name: "RanjanHome_WiFi", strength: 4, secured: true, connected: true },
    { name: "Neighbor_Network", strength: 2, secured: true, connected: false },
    { name: "Public_WiFi", strength: 3, secured: false, connected: false },
    { name: "Office_Network", strength: 1, secured: true, connected: false },
  ]

  return (
    <div className="h-full bg-[#c0c0c0] flex flex-col">
      {/* Menu Bar */}
      <div className="h-6 bg-[#c0c0c0] border-b border-[#808080] flex items-center px-2">
        <div className="flex space-x-1">
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">File</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Edit</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">View</button>
          <button className="px-2 py-0 bg-[#c0c0c0] text-xs hover:bg-blue-600 hover:text-white">Help</button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        {/* Network Adapters */}
        <div className="border border-[#808080] p-3">
          <h3 className="font-bold text-sm mb-2">Network Adapters</h3>
          <div className="space-y-1">
            {networkAdapters.map((adapter) => (
              <div
                key={adapter.id}
                className={`flex items-center space-x-2 p-2 cursor-pointer ${
                  selectedAdapter === adapter.id ? "bg-blue-100 border border-blue-300" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedAdapter(adapter.id)}
              >
                <span className="text-lg">{adapter.icon}</span>
                <div className="flex-1">
                  <div className="text-xs font-semibold">{adapter.name}</div>
                  <div className="text-xs text-gray-600">{adapter.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WiFi Networks (when WiFi adapter is selected) */}
        {selectedAdapter === "wifi" && (
          <div className="border border-[#808080] p-3">
            <h3 className="font-bold text-sm mb-2">Available Networks</h3>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {wifiNetworks.map((network, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-1 text-xs ${
                    network.connected ? "bg-green-100" : "hover:bg-gray-100"
                  }`}
                >
                  <span>{"📶".repeat(network.strength)}</span>
                  <span className="flex-1">{network.name}</span>
                  {network.secured && <span>🔒</span>}
                  {network.connected && <span className="text-green-600">Connected</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TCP/IP Settings */}
        <div className="border border-[#808080] p-3">
          <h3 className="font-bold text-sm mb-2">TCP/IP Settings</h3>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" checked={dhcpEnabled} onChange={() => setDhcpEnabled(true)} className="w-3 h-3" />
              <span className="text-xs">Obtain IP address automatically (DHCP)</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="radio" checked={!dhcpEnabled} onChange={() => setDhcpEnabled(false)} className="w-3 h-3" />
              <span className="text-xs">Use the following IP address:</span>
            </label>

            {!dhcpEnabled && (
              <div className="ml-4 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs w-20">IP Address:</span>
                  <input
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="px-1 py-0 border border-[#808080] text-xs h-4 w-24"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs w-20">Subnet Mask:</span>
                  <input
                    type="text"
                    value={subnetMask}
                    onChange={(e) => setSubnetMask(e.target.value)}
                    className="px-1 py-0 border border-[#808080] text-xs h-4 w-24"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs w-20">Gateway:</span>
                  <input
                    type="text"
                    value={gateway}
                    onChange={(e) => setGateway(e.target.value)}
                    className="px-1 py-0 border border-[#808080] text-xs h-4 w-24"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DNS Settings */}
        <div className="border border-[#808080] p-3">
          <h3 className="font-bold text-sm mb-2">DNS Settings</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs w-20">Primary DNS:</span>
              <input
                type="text"
                value={dns1}
                onChange={(e) => setDns1(e.target.value)}
                className="px-1 py-0 border border-[#808080] text-xs h-4 w-24"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs w-20">Secondary DNS:</span>
              <input
                type="text"
                value={dns2}
                onChange={(e) => setDns2(e.target.value)}
                className="px-1 py-0 border border-[#808080] text-xs h-4 w-24"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-2 p-3 border-t border-[#808080]">
        <button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs">
          OK
        </button>
        <button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs">
          Cancel
        </button>
        <button className="px-4 py-1 bg-[#c0c0c0] border border-[#808080] border-t-white border-l-white text-xs">
          Apply
        </button>
      </div>
    </div>
  )
}
