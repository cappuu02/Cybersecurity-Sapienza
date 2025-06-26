
>Lesson 05 classroom
# Intoduction to IPV6 

## Introducing IPv6
- Not a “new” protocol. Developed in the mid to late 1990s.
- 128-bit address space, written in hexadecimal.
- Provides 340 undecillion addresses.
![[57a.png]]

340 undecillion is an astronomically large number—equivalent to 10 nonillion addresses per person (that's a 1 followed by 30 zeros). 

`10 nonillion = 10,000,000,000,000,000,000,000,000,000,000`

## IPv6 Addresses Scale
- 3.4×10^38 total addresses.
- Enough to assign one address to every atom on Earth and still have more.
- IPv6 exhaustion is extremely unlikely.

## IPv6 Characteristics
IPv6 is not just about more addresses:
- **Stateless autoconfiguration**.
- **End-to-end reachability without NAT**.
- **Better mobility support**.
- **Peer-to-peer networking improvements**.
- **Enhanced support for VoIP and QoS**.

## Hex and IPv6 Address Representation
![[58a.png]]

## IPV6 Address Notation
![[59a.png]]

IPv6 addresses are 128-bit addresses represented in:
• Hexadecimal: 1 hex digit = 4 bits
• Eight 16-bit segments or “hextets” (not a formal term) between 0000 and FFFF
• Separated by colons
• Reading and subnetting IPv6 is easier than IPv4…. Almost always!

## IPv4 vs IPv6 Capacity
- IPv4: 4.3 billion addresses.
- IPv6: 340 undecillion addresses.
- Comparison of number scales: thousand, million, billion, ... undecillion.

## IPv6 Compression Rules
There are two different rules for compressing IPv6 Addresses:
### Rule 1: Omit Leading Zeros
Gli zeri all’inizio di **ogni segmento a 16 bit** possono essere **omessi**.  
⚠️ Solo quelli **iniziali** (a sinistra), **non quelli finali**!

```ad-example
`2001:0db8:1000:0000:0000:0000:0000:0001`

Applichiamo la **Regola 1**:
- `0db8` → `db8`
- `0000` → `0`
- `0001` → `1`

Diventa: `2001:db8:1000:0:0:0:0:1`

```

### Rule 2: Use Double Colon ::
Any single, contiguous string of one or more 16-bit segments consisting of all zeroes can be represented with a double colon (::).

`2001:db8:1000:0:0:0:0:1`
I quattro zeri consecutivi possono essere compressi con `::`
`2001:db8:1000::1`

```ad-important
title: Rule $1$+ Rule $2$
![[61a.png]]

If there are multiple possible reductions, RFC 5952 states that the longest string of zeroes must be replaced with the :: and if they are equal then only the first string of 0’s should use the :: representation.

```

# IPv6 Global Unicast Address

![[62a.png]]

>IPv6 does not have a “broadcast” address.

==IPv6 Source==: Always a unicast (link local or GUA)
==IPv6 Destination==: Unicast, Multicast, or anycast

![[63a.png]]
![[64a.png]]

## Global Unicast Address
Gli indirizzi Global Unicast sono:
- Univoci a livello globale
- Routabili su Internet
- Utilizzati per comunicazioni tra dispositivi su reti diverse tramite internet

I GUA cominciano con i **primi 3 bit `001`** e tutti gli indirizzi IPv6 da `2000::` a `3FFF:FFFF:...` sono GUAs.

>Questi sono gli indirizzi a cui faremo più riferimento. (sono $\frac{1}{8}$ dello spazio totale IPv6)

```ad-example
![[Pasted image 20250620172620.png]]

```

![[65a.png]]
 
>IANA ha diviso lo spazio IPv6 in $8$ parti da $\frac{1}{8}$, per facilitare la gestione e l'assegnazione.

Salvo circostanze molto specifiche, tutti gli utenti finali avranno un indirizzo unicast globale

>Note: A host (an interface) can potentially have multiple IPv6 addresses on the same or different networks.

Terminology:
- **Prefix** equivalent to the network address of an IPv4 address
- **Prefix length** equivalent to subnet mask in IPv4
- **Interface ID** equivalent to host portion of an IPv4 address

![[Pasted image 20250620173215.png|500]]
IPv4 è diviso in:
- **Network Portion**: Identifica la rete (Ex: `192.168.1.0`)
- **Host Portion**: Identifica il singolo Host (Ex: `.10`)
- **Subnet Portion**: Dipende dalla maschera (Ex: `/24`)

![[Pasted image 20250620173413.png]]
**128 bit totali**, divisi in:
- **Global Routing Prefix (/48)**: assegnato da un provider o autorità
- **Subnet ID (16 bit)**: per creare sottoreti locali
- **Interface ID (64 bit)**: identifica l'interfaccia fisica/logica (es. MAC address)

### /64 Global Unicast Address and the 3-1-4 Rule
Questa regola serve a **visualizzare** e **organizzare** un indirizzo GUA in IPv6:
![[67a.png]]

```ad-example
![[Pasted image 20250620173553.png]]

```


### Subnetting IPv6
![[68a.png]]

### Static GUA Configuration
![[69a.png]]

``` bash
R1(config)#interface gigabitethernet 0/0
R1(config-if)#ipv6 address 2001:db8:cafe:1::1/64
R1(config-if)#no shutdown
R1(config-if)#exit
R1(config)#interface gigabitethernet 0/1
R1(config-if)#ipv6 address 2001:db8:cafe:2::1/64
R1(config-if)#no shutdown
R1(config-if)#exit
R1(config)#interface serial 0/0/0
R1(config-if)#ipv6 address 2001:db8:cafe:3::1/64
R1(config-if)#no shutdown
R1(config-if)#exit
```

# IPv6 Link-local Unicast

## Link-Local Unicast Address
```ad-abstract
title: Definizione
Un **indirizzo link-local** in IPv6 è un tipo di indirizzo **unicast**, utilizzato **esclusivamente per la comunicazione tra dispositivi appartenenti allo stesso link (rete locale)**, ad esempio all'interno della stessa LAN.

```

Features:
- Usato solo localmente (non instradabili oltre il link su cui sono stati creati)
- Devono essere unici nel link
- Ogni dispositivo IPv6 deve avere almeno un indirizzo link-local (obbligatorio per il funzionamento di IPv6)
- Non inclusi nella tabella di routing globale


- ==IPv6 Source== – Deve sempre essere un **indirizzo unicast**, quindi anche un link-local va bene.
- ==IPv6 Destination== – Unicast, multicast, or a.
- Unicast, including a link-local address

![[70a.png]]

![[71a.png]]
 
 Gli indirizzi link-local iniziano sempre con `FE80::/10`, cioè i primi $10$ bit sono `1111 1110 10`
 
 Modalità di generazione:
- **Automatically** :
	- FE80 (usually) – First 10 bits
	- Interface ID
		- EUI-64 (Deriva dall'indirizzo MAC)
		- Random 64 bits (many host operating systems)
- **Static (manual) configuration** – Pratica comune soprattutto sui router per configurare ad es. collegamenti IPv6 statici o tunnel

### Modified EUI-64 Format (Extended Unique Identifier–64)
![[72a.png]]

### Verifying the PC’s Link-Local Address

```
PC> ipconfig
Windows IP Configuration
Ethernet adapter Local Area Connection:
	Connection-specific DNS Suffix :
	Link-local IPv6 Address . . . . : fe80::50a5:8a35:a5bb:66e1
	IPv4 Address. . . . . . . . . . : 192.168.1.101
	Subnet Mask . . . . . . . . . . : 255.255.255.0
	Default Gateway . . . . . . . : 192.168.1.1
```

### An Important Role in IPv6

![[73a.png]]

Indirizzi Utilizzati:
- From: Link-local address
- To: Multicast

Componenti Principali
1. **ICMPv6 Router Solicitation (RS)**
	- Inviato da un host quando si collega alla rete
	- Destinazione: Multicast, tutti i router
2. **ICMPv6 Router Advertisement (RA)**
	- Risposta dei router alla RS
	- Contiene informazioni come:
		- prefisso di rete
		- lunghezza del prefisso
		- Se usare SLAAC
3. **Uso degli indirizzi link-local**
	- Sono usati come indirizzi sorgente prima che un dispositivo ottenga un indirizzo globale
	- I router usano il loro indirizzo link-local come next-hop nelle tabelle di routing

# SLAAC: stateless Address Autoconfiguration
```ad-abstract
title: Definizione
**SLAAC** è un meccanismo di autoconfigurazione IPv6 che permette a un dispositivo di generare autonomamente il proprio indirizzo IPv6 **senza bisogno di un server DHCPv6**.

```

## ICMPv6 Neighbor Discover Protocol
ICMPv6 Neighbor Discovery defines 5 different packet types

![[74a.png]]
![[75a.png]]
![[76a.png]]

Dispositivo (client), chiede informazioni al router con un messaggio **Router Solicitation** (ICMPv6).
Il router risponde con un messaggio di **Router Advertisement**, fornendo il prefisso di rete e l'indirizzo del gateway predefinito.
Il dispositivo crea il suo indirizzo IPv6 combinando:
- prefisso di rete
- identificatore generati dall'indirizzo MAC o casuale

✅ **Vantaggio:** Nessun server DHCP necessario, configurazione automatica e veloce.
❌ **Limite:** Non assegna DNS automaticamente (serve DHCPv6 o impostazione manuale).

## Address Resolution: IPv4 and IPv6
![[77a.png]]
**IPv4**: Non utilizzo l'IP ma l'indirizzo ARP. Inoltre la mia richiesta è inviata in broadcast dato che non conosco l'indirizzo MAC. Prima controllo nella ARP cache ma non è presente.

**IPv6** 
Prima controllo nel Neighbor Cache ma non è presente. È più efficiente:
- **Evita il broadcast**: utilizza multicast specifici
- **Integrazione con ICMPv6**: Non richiede un protocollo separato come ARP
- **Sicurezza migliorata**: Supporta opzioni crittografiche

>Is ICMPv6 over IPv6 over Ethernet

## Router Solicitation & Router Advertisement Messages
Il protocollo **ICMPv6 Neighbor Discovery (ND)** è fondamentale per il funzionamento delle reti IPv6 e sostituisce funzioni tradizionalmente gestite da ARP, DHCP e ICMP Redirect in IPv4. Definisce 5 tipi principali di messaggi:

- **Router Solicitation message**: inviato da un host in multicast a tutti i router per richiedere di inviare info di configurazione.
- **Router Advertaisement**: Inviato dal router con destinazione multicast a tutti i nodi con lo scopo di fornire il prefisso IPv6, gateway predefinitio e flag per SLACC/DHCPv6
- **Neighbor Solicitation**: inviato da un host/router con destinazione multicast per risolvere un indirizzo IPv6 in un indirizzo MAC.
- **Neighbor Advertisement**: Inviato da un dispositivo target con destinazione un indirizzo Unicast con scopo di rispondere con il proprio MAC o annunciare cambiamenti.
- **Redirect Message**: Inviato da un ruoter ad un host specifico per indicare un persorso più efficiente verso una destinazione.


![[78a.png]]
![[79a.png]]

## Dynamic IPv6 Address Allocation
How to assign the IPv6 Addresses (global unicast $\to$ routable addresses)
![[80a.png]]

### Dynamic Address Allocation in IPv4
In IPv4 to obtain dinamically an IPv4 address we can use the DHCPv4. Is the only way to obtain an IPv4 address in a dynamic way!
![[81a.png]]

### Dynamic Address Allocation in IPv6
In IPv6 we have two different option to obtain an IPv6 address (GUA): 
_Stateless_ $\to$ SLACC + DHCPv6
_Statefull_ $\to$ DHCPv6

Host join into a new network and said "how can i get my IPV6 address global Unicast for this network?" This packet is sent to a special destination address that is a link local multicast (IPv6 router of this link).

Router send a router advertaisement. In this packet we said how the IP address is supposed to be created. (3 Options: stateless, stateless with DHCPv6 and statefull) 

![[82a.png]]

==Router Advertisement: 3 Options==
![[83a.png]]

>Default gateway will be taken directly from router advertaisement


#### Stateless (1 option)
![[84a.png]]

![[86a.png]]

Host connect into a network with its own MAC address.
Host send a router solicitation.

Router:
`FF02::1` send this information to a multicast address (to all devices)
`FE80::1` from the router (its link local address)
The Prefix to use is `2001:DB8:CAFE:1::`
Send the Router Advertaisement to all the host.

>Interface ID can be randomly generated or generated using EUI-$64$

>We don't use DHCPv6

**SLAAC: ==Interface ID==**
```ad-abstract
title: Definizione
L'**Interface ID** (64 bit) è la parte che identifica univocamente un host all'interno di una rete IPv6. Viene generato automaticamente tramite **SLAAC** (Stateless Address Autoconfiguration)

```

**Metodo EUI-64**
- Utilizza l'indirizzo MAC per generare un Interface ID
**Privacy Extension (Randomly Generated Number)**
- Genera un Interface ID **casuale** (non basato sul MAC) per evitare tracciamento.

![[87a.png]]

**SLAAC: EUI-64 Option**
![[88a.png]]


##### Verifying SLAAC on the PC Using EUI-64
![[90a.png]]

##### Verifying SLAAC on the PC Using Privacy Extension
![[91a.png]]

## Ensuring Unique Unicast Addresses
Since we are generating IPv6 address in a random manner, It can happend that we pick the same address of any one else. (very unlucky!)
To solve we use a mechanism called Duplicate Address Detection (DAD)
- After sending a Neighbour solicitation, if i don't receive anything i have unique address 
- If i receive something i have a duplicate address
![[92a.png]]

#### SLACC + DHCPv6 (Stateless + )
![[93a.png]]

## Router as a Stateless DHCPv6 Server
![[95a.png]]
Differences between SLACC configuration is about flags:
- M Flag (Manage Flag)
	- 0 is stateless
	- 1 is statefull
- O Flag (Option)
	- Additional Options

I created my own address and have the default gateway, but i need a DNS address...
So i do DHCPv6 request (solicit packet) $\to$ Advertise from server $\to$ information request $\to$ and reply.
## SLAAC for Addressing & DNS for Other Information
![[96a.png]]

With the Flag equal to $1$ we solicit the DHCPv6 server and we obtain from DHCPv6 server the DNS address for local host (`2001:DB8:CAFE:1::99`) and also the domain of the network (`cafe.com`)

#### Router as a Stateful DHCPv6 Server
![[98a.png]]

>Rispetto a prima, i flag sono invertiti!


![[99a.png]]


# DHCPv6 Prefix Delegation Process
```ad-abstract
title: Definizione
La **Prefix Delegation (PD)** è un meccanismo del DHCPv6 che permette a un router di ottenere un **prefisso IPv6 pubblico** (es. `/48` o `/56`) da un **ISP** (Internet Service Provider) per assegnare indirizzi alla sua rete locale.

```

## DHCPv4 and Private Addresses for the Home
![[100a.png]]
Home router connect with the ISP router and receive only one public address for communicating into internet (all the host in the network don't have a public address, they will use NAT)

![[101a.png]]
- ISP only has to deliver a public IPv4 address for Home router interface.
- NAT is used for translation – but has its drawbacks!
- No NAT between private-public IPv6 (always in debate)

## HOME Router’s ISP Facing Interface
![[102a.png]]
First, HOME’s ISP facing interface needs an IPv6 address
Similar to any IPv6 client it may dynamically get an address using:
- SLAAC - Using prefix in RA
- Stateless DHCPv6 – SLAAC but DHCPv6 for DNS address
- Stateful DHCPv6 - Like DHCPv4
What about the address for the HOME LAN?
## DHCPv6 Steps
![[103a.png]]
1. Prefix Delegation Request
2. Router is responsible for that network, send a reply giving an IPv6 prefix for home LAN.


