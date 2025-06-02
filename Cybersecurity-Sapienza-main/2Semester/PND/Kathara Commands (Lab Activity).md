# Introduction
In order to (properly) use Internet a host has to receive 4 main pieces of
information:
- The IP address
- The netmask
- The IP address of its default gateway
-  The IP address of a DNS (Domain Name Server)

Generally located in `/etc/network/interfaces`
Usually you can insert additional configuration files in the `/etc/network/interfaces.d/` directory. `Ex: /etc/network/interfaces.d/eth0`
After the modifications, use the `ifup/ifdown` commands
![[1ka.png]]

>Warning: since kathara is based on docker, the ifup command will not change the `/etc/resolv.conf` file and you have to do it manually

## Manual network configuration (linux) (old school – legacy)
`ifconfig` to assign the IP address. 
This command is used to configure network interfaces, or to display their current configuration. In addition to activating and deactivating interfaces with the “up” and “down” settings (`ifup` and `ifdown`)

`route` to define the default gateway
The route command is the tool used to display or modify the routing tab `/etc/resolv.conf` to specify the DNS server(s)
##  Manual network configuration using ip (preferred)
`ip addr` to assign the IP address.
This command is used to configure network interfaces, or to display their current configuration. In addition to activating and deactivating interfaces with the “up” and “down” settings.

- ip route to define the default gateway
- The route command is the tool used to display or modify the routing table `/etc/resolv.conf` to specify the DNS server(s).

## Lab 1 Ex 1
**Configure pc1 using the interfaces file**

``` python
ip addr flush eth0 # **rimuove tutte le configurazioni IP** da eth0.
auto eth0
iface eth0 inet static
    address 192.168.100.26
    netmask 255.255.255.248
    gateway 192.168.100.30
    dns-nameservers 8.8.8.8

ifdown eth0 && ifup eth0 #spegne e riaccende l'interfaccia
```

Questa è una **configurazione statica** da inserire nel file `/etc/network/interfaces`.
- `auto eth0`: Dice al sistema di attivare automaticamente l’interfaccia `eth0` al boot.
- `iface eth0 inet static`: Specifica che l’interfaccia userà una configurazione IP **statica**, non DHCP.
- `address`: IP assegnato manualmente al nodo (es. `192.168.100.26`).
- `netmask`: La subnet mask, qui `/29` → `255.255.255.248`.
- `gateway`: Gateway predefinito, che è `r1` nel tuo caso.
- `dns-nameservers`: Server DNS da usare, in questo caso Google (`8.8.8.8`).


**Configure pc2 using the ip command**

```python
ip addr flush dev eth0 #1
ip addr add 192.168.100.27/29 dev eth0 #2
ip route add default via 192.168.100.30 #3
```

2. Questo comando **assegna manualmente** all'interfaccia `eth0` l'indirizzo IP `192.168.100.27` con subnet `/29`
3. Questo comando imposta **la route predefinita** (default gateway) per il traffico destinato a Internet o a reti diverse. Tutti i pacchetti che **non sono per la rete locale** verranno instradati attraverso `192.168.100.30`, che nel tuo caso è `r1`, il router.


**Configure pc3 using the ifconfig command**

``` python
ifconfig eth0 192.168.100.28 netmask 255.255.255.248 up #1
route add default gw 192.168.100.30 #2

```

1. Configura l'interfaccia `eth0` con:
	- **IP:** `192.168.100.28`
	- **Netmask:** `255.255.255.248` (che corrisponde a `/29`)
	- `up`: attiva l’interfaccia se era spenta
2. Imposta **il default gateway** (cioè dove mandare tutto il traffico non locale) su `192.168.100.30`, che nel tuo setup è `r1`.

**Configurazione Router r1**

```python
ip addr replace 192.168.100.30/29 dev eth0 #1
iptables -t nat -A POSTROUTING -o eth1 -j MASQUERADE #2
```

1. Questo comando **assegna l'indirizzo IP** `192.168.100.30/29` all'interfaccia `eth0` di `r1`. Questo rende `r1` il **gateway della rete LAN** (interfaccia verso `pc1` e `pc2`).
2. Questo comando **attiva il NAT** (Network Address Translation) sulla **seconda interfaccia di `r1`**. **serve per fare NAT**, così i PC possono navigare su Internet passando da `r1`.

## Lab 1 Ex 2

Su router 1 andare in `/etc/udhcpd.conf` ed editare le seguenti cose:
![[2ka.png]]
![[3ka.png]]

Poi avviare il server dhcp con il comando: `udhcpd -f udhcpd.conf`

```ad-abstract
title: PC1 Setup

Su pc1 andare in /etc/network/interfaces.d/eth0 e scrivere:
`auto eth0`
`iface eth0 inet dhcp`
poi fare:
`ifup eth0`
ed ottiene l'ip dinamico dal server dhcp
```


```ad-abstract
title: PC2 Setup

Su pc2, più semplice, fare:
`dhclient eht0`
```


## Lab 1 Ex 3

```ad-bug
Da fare

```

## Lab 2 Ex 1
Configurare una topologia con:
- Un router (`r1`) con due interfacce (LAN1 e LAN2)
- Quattro host (`pc1`, `pc2`, `pc3`, `pc4`) distribuiti su due LAN
- Indirizzi IPv6 statici assegnati manualmente
- `r1` come gateway predefinito per tutti i PC, usando il suo indirizzo link-local

---

### Topologia
- **LAN1 (eth0 su r1):** `2001:db8:cafe:1::/64`
  - `pc1`: `2001:db8:cafe:1::101/64`
  - `pc2`: `2001:db8:cafe:1::102/64`
- **LAN2 (eth1 su r1):** `2001:db8:cafe:2::/64`
  - `pc3`: `2001:db8:cafe:2::103/64`
  - `pc4`: `2001:db8:cafe:2::104/64`
- **Router `r1`**
  - LAN1: `2001:db8:cafe:1::1/64`, `fe80::1`
  - LAN2: `2001:db8:cafe:2::1/64`, `fe80::1`

---

### Configurazione

#### ✅ Router `r1` (`r1.startup`)
```bash
ip -6 addr add 2001:db8:cafe:1::1/64 dev eth0
ip -6 addr add fe80::1 dev eth0

ip -6 addr add 2001:db8:cafe:2::1/64 dev eth1
ip -6 addr add fe80::1 dev eth1

sysctl -w net.ipv6.conf.all.forwarding=1
echo "nameserver 8.8.8.8" > /etc/resolv.conf


```

#### PC1 (and others)
``` bash
auto eth0
iface eth0 inet6 static
    address 2001:db8:cafe:1::101
    netmask 64
    gateway fe80::1
    dns-nameservers 8.8.8.8
```

### Testing
**Verifica locale**
`ip -6 addr show`

**Ping del router via link-local**
`ping6 fe80::1%eth0`

**Ping del router via GUA**
`ping6 2001:db8:cafe:1::1`

**Ping tra host nella stessa LAN**
`ping6 2001:db8:cafe:1::102`

>Nell'esercizio tutti (sia pc sia r1) avevano un indirizzo IPv6 GUA (Global Unicast Address) e solo r1 aveva due indirizzi Link-Local.

## Lab 2 Ex 2 (SLAAC, No DHCPv6)
Guida [IP Sysctl](https://docs.kernel.org/networking/ip-sysctl.html)

```ad-abstract
title: SLAAC
**SLAAC** (Stateless Address Autoconfiguration) è un meccanismo di **autoconfigurazione automatica degli indirizzi IPv6** che consente a un host di generarsi un indirizzo IPv6 **senza bisogno di un server DHCP**.




```

**Funzionamento**
- **Il router** sulla rete invia un **Router Advertisement (RA)**.
    - Questo pacchetto contiene il **prefisso IPv6** della rete (es. `2001:db8:cafe:1::/64`).
    - Indica che gli host possono configurarsi **da soli** (stateless).
- **Il PC riceve il RA** e:
    - Usa il **prefisso** (es. `2001:db8:cafe:1::/64`)
    - Combina quel prefisso con il proprio identificatore di interfaccia (in genere derivato dal MAC) per generare un indirizzo **completo**.
    - Esempio finale: `2001:db8:cafe:1::abcd:1234:5678:9abc`
- L'host si configura **automaticamente** e inizia a usare quell’indirizzo.

>==radvd== è un demone per la gestione dei messaggi di pubblicità router (Router Advertisement) in IPv6

The router Advertaisement is from the link local address of the router to multicast local ipv6 (all the devices that can speack ipv6)


### Router R1 Configuration
`radvd -n -C /etc/radvd.conf/` Avviare il daemon

### PC1 Configuration
`nano /etc/network/interfaces.d/eth0`
`iface eth0 inet6 auto`
`ifup eth0`
`tcpdump -t -vv`

>Configurato tramite **Interfaces**
### PC2 Configuration
`sysctl -w net.ipv6.conf.eth0.forwarding=0` turn off the forwarding like a router!

```ad-important
Se non disattivo questo il pc2 non riceverà l'advertaisement ma lo forwarderà come un router! Se non ricevo l'Adv di conseguenza non posso ottenere il GUA (Global Unicast Address). Per disattivarlo impostarlo a 0. Qualsiasi valore diverso da zero viene considerato come TRUE!

```

In generale per PC2 io devo settare il "**Random Interface ID**" dunque:
`sysctl -w net.ipv6.conf.eth0.addr_gen_mode=3`
After that the address that we will obtain will be dynamic and not similar to MAC!

### PC3 Configuration
**PC3 has to use stable privacy extension, setting the stable_secret**

Se proviamo ad eseguire `sysctl -w net.ipv6.conf.eth0.addr_gen_mode=2` non funziona perchè, il numero 2, permette di generare un stable privacy addresses utilizzando un secret from stable_secret. Se infatti controlliamo vedremo che non ce l'abbiamo `sysctl net.ipv6.conf.eth0.stable_secret`. Quindi ne prendiamo uno, anche di un altro pc, lo scrivimo con `-w` e poi possiamo settare `addr_gen_mode=2`.

### PC4 Configuration
**pc4 has to use the EUI-64 and use the temporary addresses. Set up a short lifetime in order to see multiple addresses.**

`sysctl -w net.ipv6.conf.eth0.temp_valid_lft=180`
`sysctl -w net.ipv6.conf.eth0.temp_prefered_lft=60`
`sysctl -w net.ipv6.conf.eth0.use_tempaddr=1`

Questa configurazione su **PC4** abilita gli **indirizzi IPv6 temporanei** per proteggere la privacy:

- Usa **EUI-64** per generare l’indirizzo principale (basato sul MAC address).
- Abilita anche **indirizzi temporanei** (`use_tempaddr=1`), che cambiano nel tempo.
- Gli indirizzi temporanei:
    - Sono **preferiti** solo per 60 secondi.
    - **Scadono** dopo 180 secondi.
- Questo permette di osservare il cambio automatico degli indirizzi temporanei in pochi minuti.

```ad-abstract
title: addr_gen_mode
Definisce **come** il sistema genera gli indirizzi IPv6 (es. link-local o quelli da autoconfigurazione SLAAC):

![[Pasted image 20250508224918.png]]


```



```ad-abstract
title: Stable_secret
È una **chiave segreta** usata per generare **indirizzi IPv6 stabili e privati**, secondo l’RFC 7217. Normalmente, IPv6 può generare indirizzi usando l’hardware (es. MAC address) → questo può **rendere tracciabile il dispositivo**. Con un `stable_secret`, si può generare un indirizzo **stabile ma non tracciabile**, perché non è legato al MAC.

**Quando si usa?**
Quando `addr_gen_mode = 2` o `3` (vedi sotto), cioè quando vuoi indirizzi IPv6 **stabili ma privati**.

```


## Lab 2 Ex 3

## Lab 2 Ex 4


## Lab 2 Ex 7
on pc3 run `scapy` command and follow the guide in the security PDF.
After that, activate the `radvd` on r1 and check if pc1 and pc2 receive the GUA.

In pc1 i do:
`cp /shared/shared/thc-ipv6-3.6.zip  .`
`unzip thc-ipv6-3.6.zip`
`cd thc-ipv6-3.6`
`make`

in pc2 i do:
`cp shared/master.zip .`
`unzip master.zip `
`cd ipv6toolkit-master/`
`make instal`

Now i have all the tools that are required for comleting our exercise.

in r1:
`tcpdump -nt -i eth0`
in pc1:
`./alive6 eth0`

other tool to use is this
in pc2:
`./scan6 -L -i eth0`



```ad-seealso
Exercise 2.2: IPv6 Network Scanning
In this exercise we introduce two new toolsets:
1. THC-IPV6 [3]: Complete tool set to attack the inherent protocol
weaknesses of IPv6 and ICMPv6, and includes an easy to use packet
factory library.

2. The IPv6 Toolkit [4]: Set of IPv6 security assessment and trouble-
shooting tools. It can be leveraged to perform security assessments of

IPv6 networks, assess the resiliency of IPv6 devices by performing real-
world attacks against them, and to troubleshoot IPv6 networking

problems.
Both toolsets have many different tools (i.e. binaries). In this exercise we will
use the ones available to find out IPv6 addresses on the network.
a) THC-IPV6 has a tool called alive6
To scan your network, go to Host C terminal and type:
# alive6 eth0
#

Optional: You can capture packets from another host, A or B, to see how
alive6 tries to discover hosts on the subnet. You can use Scapy’s sniff()
function or tcpdump.
NOTE: All THC-IPV6 tools are in the folder /usr/local/bin/. You can take a
look at what other commands are available.

b) The IPv6 toolkit has a tool called scan6
To scan your network, go to Host C terminal and type:
# scan6 -L -i eth0
#
Optional: You can capture packets from another host, A or B, to see how
alive6 tries to discover hosts on the subnet. You can use Scapy’s sniff()
function or tcpdump.
July 2024 9

IPv6 Security Training Course

NOTE: All The IPv6 Toolkit tools are in the folder /usr/local/sbin/. You can
take a look at what other commands are available.

```

## Lab 4 Ex 1 (iptables)
![[2Semester/PND/images PND/188.png]]


```ad-question
title: Cos'è `connect-lab.sh`?

È uno **script fornito insieme al laboratorio Kathará** (di solito dai docenti) che fa quanto segue:

1. **Crea un’interfaccia virtuale (`veth`)** sul tuo sistema reale.
    
2. La collega alla rete **esterna** del lab Kathará (quella a cui è collegata `r1[eth1]`).
    
3. Assegna all’interfaccia del tuo host l’IP `192.168.10.2/24`.
    
4. Imposta il nome dell'interfaccia come `external` (in questo caso).
    
5. Permette al tuo host di comunicare con `r1` sulla sua interfaccia `192.168.10.1`.

```

1. esegui `./connect-lab.sh 192.168.10.2/24 external`
2. prova a pingare r1 `192.168.10.1` (gateway for the internal network)
3. Bisogna aggiungere una nuova route per far arrivare il nostro pc fino alla rete interna `192.168.100.0/24`
	- ip route add `192.168.100.0/24` via `192.168.10.1` 
	- Ora dal nostro terminale host possiamo pingare eth0 ed anche la rete interna!
4. Vogliamo ora che il nostro router lavori come un firewall (filtering traffic from the external to internal)

**Objective 1: block any ping to our pc1**
![[2Semester/PND/images PND/189.png]]

`tcpdump -nt` on pc1
`iptables -A INPUT -p icmp --icmp-type echo-request -j DROP` on pc1
Se proviamo a pingare da s1 a r1 i pacchetti arrivano al router ma poi non arrivano al pc1!
L'unico host su cui non arriva nulla, è il pc1.
`iptables -F` per fare il clean delle regole iptables.

>PC1 block any ICMP direct to ourself! `INPUT` in the command say:"Questo comando iptables blocca tutte le richieste di ping (ICMP echo-request) in entrata sul server, impedendo così agli altri di verificare se la macchina è online."

**Objective 2: Exclude any service but HTTP on s1**
![[2Semester/PND/images PND/190.png]]

Nel server s1 sta girando un webserver con apache2 in locale, che risponde alle richieste.
se applico le regole di iptables e dal mio pc host provo a pingare il server s1 ottengo: "destination port unreachable". È diverso da prima in quanto, ora abbiamo una risposta dal server mentre prima non avevamo alcuna risposta da pc1! La differenza nei comandi sta che:
- Ora utilizziamo il `reject` (sending an answer)
- Prima utilizzavamo il `Drop` (drop the packet without an answer)

```ad-abstract
title: Iptables Definition
It is the implementation of a packet filtering firewall for Linux that runs in kernel space .It is the evolution of ipchains and ipfw. Coming successor will be nftables
- iptables tool inserts and deletes rules from the kernel’s packet filtering table
- It can also operate at the Transport layer (TCP/UDP)

```

>We are changing the rule inside our kernel!

## Iptables fundamantals
The rules are grouped in tables (For now, we focus on the FILTER table)
Each table has different CHAINS of rules
Each packet is subject to each rule of a table
Packet fates depend on the first matching rule
To see chains and rules of the filter table: `iptables -L` or `iptables -L -n -v --line-numbers`

## Filter table
Three built-in rule chains:
-  INPUT
- OUTPUT
-  FORWARD

If a packet reaches the end of a chain, then is the chain policy to determine the fate of the packet (DROP/ACCEPT)

![[2Semester/PND/images PND/191.png]]

## Create and save a rule set
You can save in a shell script the sequence of the iptables commands. Typical structure of iptables_rules.sh:
``` bash
#!/bin/bash

# flush (clean) the filter table
iptables -t filter -F
# allow only service XX
iptables ...
```

Or you can use the built in commands
- `iptables-save > iptables_rules.bk`
- `iptables-restore < iptables_rules.bk`

## Useful iptables command switches
![[2Semester/PND/images PND/192.png]]


## Review the rulesets of demos
`iptables -A INPUT -p icmp –icmp-type echo-request -j DROP`
`iptables -A INPUT -p tcp –-destination-port 80 -j ACCEPT`
`iptables -A INPUT -j REJECT`

We can specify different “targets” (this is a subset):
- ==ACCEPT==: the packet is handed over to the end application or the operating system for processing.
- ==DROP==: the packet is blocked.
- ==REJECT==: the packet is blocket, but it also sends an error message to the source host of the blocked packet.
- LOG: the packet is sent to the syslog daemon for logging.
	-  iptables continues processing with the next rule in the table.
	- You can't log and drop at the same time use two rules ( → --log-prefix ”reason" )

## Other useful iptables command switches
![[2Semester/PND/images PND/193.png]]

```ad-example
title: Modules examples
![[2Semester/PND/images PND/194.png]]


```

## More on the conntrack module
Clever use of logic to recognize connections, even with connection-less protocols (UDP, ICMP...).
![[2Semester/PND/images PND/195.png]]




---

## Lab 5 Ex 1 (VPN first)
https://chatgpt.com/share/6825cdb5-9070-8006-a03a-fd9d358eff4f

## Lab 5 Ex 2 (Openvpn)

![[2Semester/PND/images PND/199.png]]

## IPvSec


