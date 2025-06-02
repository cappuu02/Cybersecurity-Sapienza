`ip link show shows` the details of every available iface
`ip link set eth0 up` brings up eth0 interface
`ip link set eth0 down` brings down eth0 iface

Assign IPV4 addresses to the interfaces:
`ip address show`
`ip address add a.b.c.d/m dev ethX` assigns a.b.c.d address with submask m to device ethX

Ping test: `ping a.b.c.d`

`ip route show` show the available routes on the host
`ip router add a.b.c.d/m via the next_hop_ip` 
`ip route add default via next_hop_ip`
There is a special subnet, called ”default”, wich is 0.0.0.0/0, that enables you to define the
gateway.

`tracerouter a.b.c.d` finds the number and addresses of hops to reach a.b.c.d

**Netcat**
Netcat allows us to send data over TCP and UDP protocols. In order to use that, we must
specify the protocol we ant to use, the port we want to use and if we want to send or ”listen”
on that particular port:

`nc ip_addr port_num` connect via TCP to ip_addr trough port_num
`nc -u ip_addr port_num` Send UDP datagrams to ip_addr trough port_num
`nc -l -p port_num` listen for TCP connections on port_num
`nc -u -l -p port_num` listen for UDP datagrams on port_num

`tcpdump -i iface_name -w filename.pcap` capture packets on iface_name and save captured packets on filename.pcap (after we can inspect this thanks to wireshark)


`echo "ciao" | nc address port` send a packet with "ciao" to the address in the port 8080

----

`iface eth0 inet dhcp` insert this in the path /etc/network/interfaces to configure a network node to use DHCP

To configure a node as DHCP server, create a file `dhcpd.conf` in `/etc/dhcp/` (in the exercise this file was created in the **router** path that is the neighbour of PC1 and PC2)

>A daemon is a background process which is configured via configuration files like `/etc/network/interfaces` (in questa cartella ci sono i file di configurazione)

Poiché il processo di avvio di una macchina virtuale Kathara lancia prima il demone di rete e dopo monta i file e le cartelle all'interno delle cartelle della macchina virtuale nel laboratorio, è necessario riavviare il demone tramite: `/etc/init.d/networking restart` (startup).


Configuration file `dhcpd.conf`
```c
#Per quanto tempo assegno un indirizzo IP ad un dispositivo client nella rete.
default-lease-time 3600;

subnet 192.168.1.0 netmask 255.255.255.0 {

        range 192.168.1.2 192.168.1.254; # fino a 254(1 broadcast e dedicated)
        option routers 192.168.1.1; #Per il gateway predefinito
}

#Con questa sottorete, netmask 255.255.255.0, gli indirizzi
#IP assegnbili variano tra: "192.168.1.255 - 192.168.1.254"
```


----


## IGP-OSPF (Link State Protocol)




----
![[Pasted image 20241214151101.png]]
![[Pasted image 20241214151417.png]]
![[Pasted image 20241214151533.png]]![[Pasted image 20241214152841.png]]
![[Pasted image 20241214152854.png]]
![[Pasted image 20241214152910.png]]



----
## VPN
A private network is composed of computers owned by a single organization
that share information specifically with each other. They’re assured that they are
going to be the only ones using the network, and that information sent between
them will (at worst) only be seen by others in the group.

```ad-attention
title: Problem
What happens if the organization has multiple geographical locations?
What happens if you are in a mission abroad and want to access the network?

We need to use a VPN over a public network

```

VPNs allow you to create a secure, private network over a public network such as the
Internet. This is done through encryption, authentication, packet tunneling and
firewalls. Since the Internet is a public network, you always risk having someone access any
system you connect to it.

### Public Key Infrastructure (PKI)
A PKI consists of the protocols, the policies and the cryptography mechanism
used to manage public key certificate. A PKI requires the definition of:
- Certificate format
- Relationship among CAs
- Mechanisms and policies for issuing and revoking certificate
- Storage services

#### Public Key Certificate
A public key certificate is a data structure that binds a public key PUB KEY
to the the identity id of the legitimate owner. 

![[Pasted image 20241214180542.png]]
The binding between ⟨id, PUB KEY id⟩ is granted by a trusted Certification
Authority (CA) that signs: $\text{CERT}_{id}$
Provided that we have the CA’s public key, we can verify the CA signature and
therefore verify the public key authenticity.

#### Chain Of Trust
A client has its certificate issued (signed) by a Certification Autorithy X.
The certificate of x, issued by another CA y. This creates a chain of signatures, also known as **chain of trust**. 
- The CA that “starts” the chain is called Root CA
- A Root CA self-signs its own certificate

![[Pasted image 20241214180935.png]]
1. Clients have to trust root CAs.
2. Signature verification can be done by the client just with the certificates.

### X.509 Certificate Format
The x509 standard is used in TLS, which is the security transport layer on top of which is based OpenVPN, HTTPS and many more.




## Building PKI
![[Pasted image 20241214181715.png]]![[Pasted image 20241214181732.png]]
![[Pasted image 20241214181745.png]]
