> PDF 07 classroom
## IPv6 Address Types
![[104a.png]]

## SLAAC: Random 64-bit Interface ID
![[105a.png]]

**Temporary Addresses**
Idea: provide additional addresses that have relatively short lifetimes and are used as the source address when originating connections. Same prefix as a public address, randomized
value for the Interface ID. Short lifetime, usually hours or days. It is common to have multiple temporary addresses to make sure existing connections can continue while a new temporary address is created for new connections.

![[106a.png]]

## IPv6 Multicast Addresses
![[107a.png]]
A multicast address allows a device to send a single packet to multiple destinations simultaneously (one-to-many communication). In IPv6, this is similar to the **224.0.0.0/4** range in IPv4. There are two main types of multicast addresses: **assigned** (predefined for specific functions) and **solicited-node** (used for efficient neighbor discovery).

- IPv6 Source – Always a unicast
-  IPv6 Destination – Unicast, multicast, or anycast.

### Multicast Range
![[108a.png]]

### Scope
The **scope** is a 4-bit field in an IPv6 multicast address that determines the reach of the multicast packet. It specifies how far the traffic can propagate within the network. Here are some of the key scope values:  

- **0 (Reserved)** – Currently unused.  
- **1 (Interface-Local scope)** – Limits the packet to a single interface, preventing it from being forwarded.  
- **2 (Link-Local scope)** – Restricts the packet to the local network segment, such as a single Ethernet broadcast domain.  
- **5 (Site-Local scope)** – Confines the packet to a specific site or organization, similar to private addressing in IPv4.  
- **8 (Organization-Local scope)** – Allows multicast traffic to span multiple sites within an organization.  
- **E (Global scope)** – Enables worldwide distribution, meaning the packet can traverse the entire internet.  

This structure ensures efficient and controlled delivery of multicast traffic based on its intended range.

![[110a.png]]

Flag
• $0$ - Permanent, well-known multicast address assigned by IANA.
• Includes both assigned and solicited-node multicast addresses.
• $1$ - Non-permanently-assigned, “dynamically" assigned multicast address.
• An example might be `FF18::CAFE:1234`, used for a multicast application
with organizational scope.

## Assigned IPv6 Multicast Addresses
![[111a.png]]
RFC 2375, IPv6 Multicast Address Assignments, defines the initial assignment of IPv6
multicast addresses that have permanently assigned Global IDs.

## Assigned Multicast Addresses with Link-local Scope
![[112a.png]]
Used to communicate within a “site”, possibly routed within the site.
• Must have `IPv6` multicast routing enabled:
	`Router(config)# ipv6 multicast-routing`
• `DHCPv6`, relay agents and `DHCPv6` multicast addresses are included in Lesson
`8`.

## DHCPv6 without and with relay agents
![[113a.png]]

## “All IPv6 Devices” Assigned Multicast Address

![[114a.png]]

The multicast address **FF02::1** represents *all IPv6 devices on the local network segment*, including routers. Every IPv6-enabled host automatically joins this group and processes packets sent to this address.  

You might wonder: *Is this the same as a broadcast?* The answer is no. Unlike IPv4 broadcasts, which flood traffic to all devices, IPv6 multicasts are more efficient. **FF02::1** maps to a specific Layer 2 multicast MAC address, reducing unnecessary network overhead—a concept we’ll explore in more detail later.  

This approach ensures that communication remains optimized, avoiding the inefficiencies of traditional broadcast traffic.

# IPv6 vs. IPv4
![[115a.png]]
The foundation of IPv6 lies in its streamlined header design, optimized for modern 64-bit processors. Unlike IPv4, the IPv6 header has a **fixed 40-byte structure**, making it simpler and more efficient for routing.

Key differences include:
- **Simplified format** – IPv6 removes unnecessary fields, reducing processing overhead.
- **No checksum field** – Unlike IPv4, IPv6 offloads error-checking to higher layers (TCP/UDP) for faster forwarding.
- **Extension headers** – Optional features (like fragmentation or security) are handled through modular headers, improving flexibility.

This design enhances performance and scalability, paving the way for a faster, more adaptable internet. Let’s explore these differences in detail.

```ad-info
title: Version

IPv4 Version contains 4.
- IPv6 Version contains 6.
- Version 5: Internet Stream Protocol (ST2)
```

```ad-info
title: nternet Header Length

IPv4 Internet Header Length (IHL)
- Length of IPv4 header in 32-bit words including any Options or Padding.
IPv6
- IHL for IPv6 is not needed.
- IPv6 header is fixed at 40 bytes.
```

```ad-info
title: Traffic Class

IPv4 Type of Service
IPv6 Traffic Class
- Not mandated by any IPv6 RFCs.
- Same functionality as IPv4.
- Uses same Differentiated Services technique (RFC 2474) as IPv4.
```

```ad-info
title: IPv6 Payload Length
IPv6 Payload Length
- IPv4 Total Length – Number of bytes of the IPv4 header (options) + data.
-  IPv6 Payload Length – Number of bytes of the payload.
	- Does not include the main IPv6 header.
	- Includes extension headers + data

```

## IPv6 Flow Label
New field in IPv6 – not part of IPv4.
- Flow label is used to identify the packets in a common stream or flow.
- Traffic from source to destination share a common flow label.
-  RFC 6437 IPv6 Flow Label Specification
Many systems set the Flow Label for packets that belong to different TCP sessions

![[116a.png]]

## IPv4 Fragmentation
Unlike IPv4, where **routers handle fragmentation**, IPv6 simplifies the process:  
- **No router fragmentation** – Intermediate devices (like IPv6 routers) **never fragment packets**. This reduces delays and processing overhead.  
- **Source-controlled fragmentation** – If fragmentation is needed, the **source device** handles it using an **extension header** (Fragment Header).  
- **Efficiency** – By eliminating fragmentation in transit, IPv6 avoids bottlenecks and ensures smoother packet forwarding.  

This design shift improves performance, making IPv6 more scalable and reliable for modern networks.

![[117a.png]]

## IPv6 No Fragmentation
![[118a.png]]

## IPv6 Next Header
**IPv4 Protocol**
**IPv6 Next Header**: For both protocols, the field indicates the type of header following the IP header.

![[119a.png]]

## IPv6 Hop Limit
IPv4 TTL (Time to Live)
IPv6 Hop Limit
- Renamed to more accurately reflect process.
- Set by source, every router in path decrements hop limit by 1.

>When 0, drop packet.

## IPv6 Source and Destination Addresses
IPv6 Source and Destination addresses have the same basic functionality as IPv4.
- IPv4 – 32-bit addresses.
- IPv6 – 128-bit addresses.
Some significant changes in IPv6.

## IPv4 Header Checksum
Unlike IPv4, **IPv6 eliminates the header checksum** to improve efficiency. Here’s how error handling works in IPv6:

- **No IPv6 header checksum** – Removing this field reduces per-hop processing, speeding up packet forwarding.
- **Reliance on upper-layer checksums** – Protocols like **TCP and UDP** include their own checksums to ensure data integrity.
- **Stricter UDP requirements** – While IPv4 made UDP checksums optional, **IPv6 enforces them**, improving reliability for all UDP traffic.

This design trade-off prioritizes performance while maintaining data integrity where it matters most—at the transport layer.

## IPv4 Options and Padding
Unlike IPv4, which uses **variable-length options and padding** to align data, IPv6 adopts a cleaner approach:

- **No built-in options or padding** – The IPv6 header has a **fixed 40-byte size**, eliminating the need for alignment adjustments.    
- **Extension headers replace IPv4 options** – Features like fragmentation, security (IPsec), or routing instructions are handled through **modular extension headers**, added only when needed.
- **More efficient processing** – By removing variable-length fields, routers can forward packets faster without parsing complex options.

This design makes IPv6 more **scalable and performant**, while maintaining flexibility through optional extension headers.

## IPv6 Extension Header
Next Header identifies:
- The protocol carried in the data portion of the packet. IPv6 Main Header Next Header
- The presence of an extension header

Extension headers are optional and follow the main IPv6 header. Provide flexibility and features to the main IPv6 header for future enhancements without having to redesign the entire protocol. Allows the main IPv6 header to have a fixed size for more efficient
processing.

![[120a.png]]

![[121a.png]]

## IPv4 options vs. IPv6 extensions
![[122.png]]
IPv6 extensions (except Hop-by-Hop) are processed only by the destination.

## Order is important (RFC 8600 Section 4)
![[123a.png]]
