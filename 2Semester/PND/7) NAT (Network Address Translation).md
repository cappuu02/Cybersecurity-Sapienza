> PDF 12 classroom
 
 - In **routed mode**, il firewall funziona come un **router**. È visibile nella rete e ha un **IP** su ogni interfaccia. Decide il traffico in base agli **indirizzi IP** e instrada i pacchetti da una rete all’altra.
- In transparent mode, il firewall lavora come uno **switch** (Livello 2). Non ha IP visibili per le macchine collegate, quindi è **“invisibile”** nel percorso dei pacchetti. Filtra il traffico senza essere un hop di routing.

![[1a.png]]
>firewall is a router *between net1 and net2*

```ad-abstract
title: Concept of NAT 
Il ==NAT== modifica gli indirizzi IP nei pacchetti in transito, permettendo la comunicazione tra reti con spazi di indirizzamento incompatibili (es. tra indirizzi privati e pubblici).
    
Viene comunemente usato per **connettere una LAN privata a Internet**, anche se la LAN usa indirizzi **non instradabili**
```

==NAT== in a routed firewall:
- Can filter requests from hosts on WAN side to hosts on LAN side (away to filter packet coming from the outside in a simple)
-  Allows host requests from the LAN side to reach the WAN side (from private to public)
- Does not expose LAN hosts to external port scans

![[2a.png|400]]

## Routable/Non IP addressing
- ==Routable addresses== **need to be unique on the Internet to be reachable** → public IP addresses
- ==Non-routable addresses== **are not reachable from the Internet** → Special-Purpose IP addresses

![[3a.png]]

```ad-info
title: One to many translation NAT
One-to-many Network Address Translation (NAT) is ==a technique that allows multiple private IP addresses to be mapped to a single public IP address==. 

```

>There are ==13== root IP addresses for the DNS root zone, which is managed by the Internet Corporation for Assigned Names and Numbers (ICANN)

## NAT goals

```ad-info
Se cambi ISP, l’IP pubblico assegnato cambierà, ma gli **IP privati** della tua rete restano invariati. 

> Passi da ISP A a ISP B, ma i tuoi PC mantengono gli stessi IP locali. 

- **Sicurezza** (**Isolamento della Rete**)    
    - I dispositivi nella rete privata **non sono direttamente raggiungibili** dall’esterno.
        
    - Il NAT agisce da "filtro": solo le connessioni iniziate dall’interno possono ricevere risposte.
        
    - Esempio: Un hacker esterno non può connettersi direttamente al tuo PC con IP `192.168.1.5`.

```

## Source NAT (SNAT)
```ad-abstract
title: Definitione
Traduce l’**indirizzo IP sorgente** dei pacchetti in uscita dalla rete privata. Serve per fare in modo che il traffico sembri **provenire dal firewall o router NAT**, non dal dispositivo interno.

```

>Masquered connection: external server does not see the real internal IP

![[4a.png]]

Quando un client interno fa una richiesta, il firewall cambia l’IP sorgente (SNAT), e poi **inoltra al client le risposte del server esterno**. 
Se il server esterno apre una **connessione secondaria** (es. FTP o VoIP), il firewall la riconosce come **correlata alla connessione principale** e **permette/inoltra il traffico** sulla nuova porta.

The ==NAT table== is where associations between requests and internal IP addresses are kept. It associate:
- IP - internal client port
- IP - public port of router
- IP - external for server

![[5a.png]]

>La mappatura è salvata nella NAT table!

```ad-example
Il processo avviene in questo modo:

1. Un dispositivo nella LAN (es. `192.168.1.10`) invia un pacchetto a un server esterno (es. `8.8.8.8`).
    
2. Il router intercetta il pacchetto e cambia l'IP sorgente da `192.168.1.10` al proprio IP pubblico (es. `85.12.34.56`).
    
3. Il router salva la corrispondenza tra IP privato e pubblico nella NAT table, includendo anche le porte di rete se necessario.
    
4. Il server esterno riceve il pacchetto e risponde all'IP pubblico del router (`85.12.34.56`).
    
5. Il router consulta la NAT table, trova la mappatura originale e inoltra la risposta al dispositivo interno (`192.168.1.10`).
    

La NAT table è essenziale per mantenere traccia delle connessioni attive e garantire che le risposte esterne vengano correttamente instradate ai dispositivi interni. Senza di essa, il router non saprebbe a quale host interno inoltrare i pacchetti in entrata.

```

## Types of NAT: Basic and NAPT
**Basic NAT** funziona allocando un pool di indirizzi IP pubblici per mappare ciascun indirizzo interno, ​​quando i dispositivi avviano connessioni a reti esterne. Per il traffico in uscita, traduce l'indirizzo IP sorgente e aggiorna i checksum degli header pertinenti (IP, TCP, UDP, ICMP). I pacchetti in ingresso ricevono la traduzione dell'indirizzo IP di destinazione e dei checksum. Questo metodo richiede un IP pubblico per ogni sessione privata simultanea, il che risulta inefficiente a causa della scarsità di IPv4.

>Non efficiente in quanto per ogni indirizzo privato assegno un indirizzo pubblico.

**NAPT (Network Address Port Translation)** NAPT amplia il Basic NAT traducendo non solo gli indirizzi IP, ma anche i numeri di porta usati dai protocolli TCP, UDP e ICMP. Questo permette a più dispositivi nella rete privata di condividere un unico indirizzo IP pubblico, distinguendo le connessioni grazie a porte uniche. Grazie a questa tecnica, migliaia di connessioni possono passare simultaneamente tramite lo stesso IP pubblico, risolvendo così il problema della scarsità di indirizzi IPv4.

```ad-example
![[Pasted image 20250624175930.png]]

Tutte e tre le richieste escono dallo stesso IP pubblico, ma con porte diverse. Il router NAT tiene traccia di tutto nella sua tabella per sapere a chi girare le risposte.

```


**Multiplexing** significa che **più dispositivi privati condividono un unico indirizzo IP pubblico** quando comunicano con Internet.
Per farlo, il NAT usa anche i **numeri di porta TCP/UDP** (non solo l’indirizzo IP) per distinguere ogni connessione attiva.
Questo è il metodo usato dalla maggior parte dei router di **piccoli uffici e case (SOHO)**.

## NAPT: leaving packets
![[7a.png]]
![[8a.png]]

## NAPT for Incoming Requests

```ad-failure
title: Problem
NAPT blocca tutte le porte in entrata per default, impedendo connessioni verso server interni.

```

1. **Application Level Gateways (ALGs)**  
	Moduli nel router che “capiscono” certi protocolli (es. FTP, SIP) e aprono automaticamente le porte necessari
2. **Static Port Forwarding**
	Configurazione manuale per “inoltrare” una porta specifica dall’IP pubblico al server interno.
3. **Universal Plug and Play (UPnP) IGD protocol**
	Protocollo che permette ai dispositivi interni di chiedere al router di aprire automaticamente le porte necessarie.
4. **Traversal Using Relays around NAT (TURN)**
	Tecnica usata nelle comunicazioni P2P per “girare” il traffico tramite server intermedi per bypassare il NAT.


![[9a.png]]

## Destination NAT (DNAT)
```ad-abstract
title: Definition
Permette a **server interni** (nella LAN protetta dal firewall/router) di essere raggiunti da client esterni.
   
Dal punto di vista dell’utente esterno, il servizio sembra ospitato direttamente dall’**IP pubblico** del firewall/router.

```

![[10a.png]]

The firewall/router uses the NAT table to:
- Quando arriva un pacchetto dall’esterno all’IP pubblico del firewall, la tabella NAT fa da mappa e **cambia l’indirizzo di destinazione dal IP pubblico al corrispondente IP privato del server interno**.
- Quando il server interno risponde al client esterno, il firewall usa la tabella NAT per **inviare la risposta al client corretto**, traducendo di nuovo gli indirizzi se serve.
- Se durante la comunicazione il server interno apre una nuova porta o connessione (ad esempio per protocollo FTP o VoIP), la tabella NAT permette alla sessione di continuare correttamente inoltrando anche questi pacchetti aggiuntivi tra client e server.

According to the port accessed from the external interface, the packets can be forwarded towards different internal hosts.

![[11a.png]]

Change port numbers on DNAT sessions, to enable an internal server to
provide a particular service. Can make use of different or differently-configured server programs to respond to internal LAN requests and to external WAN requests.

## NAT pros and cons
NAT fornisce protezione della rete locale richiedendo l'instaurazione di stato per il traffico esterno-interno, con scadenza automatica che previene connessioni persistenti. Maschera la topologia interna usando indirizzi non-routable, preservando lo spazio IPv4 globale. I benefici includono sicurezza stateful tramite filtraggio implicito, privacy attraverso l'occultamento della struttura interna, autonomia di indirizzamento nelle reti private e semplificazione del multihoming. NAT funziona come gateway semplice tra reti private e Internet, consentendo tracking di utenti/applicazioni e conservazione significativa del pool globale IPv4.

![[12a.png|600]]
 
## NAT and firewalls
I firewall forniscono protezione essenziale ma non possono proteggere completamente una rete. Molti attacchi provengono dall'interno della rete o operano a livelli oltre il controllo del firewall. Ogni sistema deve mantenere la propria sicurezza, con processi progettati per resistere ad attacchi come stack overflow. I firewall aiutano principalmente gli amministratori bloccando traffico non autorizzato, riducendo la probabilità di attacchi cross-boundary senza eliminare tutti i rischi di sicurezza.

**Key Points**  
I firewall svolgono un importante ruolo di controllo perimetrale, ma presentano limitazioni intrinseche. Le minacce interne e gli attacchi a livello applicativo spesso aggirano le protezioni dei firewall. Il rafforzamento a livello di sistema e la resilienza dei processi rimangono requisiti di sicurezza critici. Il valore fondamentale dei firewall risiede nel filtrare il traffico non autorizzato ai confini della rete, riducendo l'esposizione alle minacce esterne e integrando al contempo altre misure di sicurezza.

## Applications not working with NAT (RFC 3027)
- Applications that have realm-specific (public or private) IP address information in payload
- Bundled session applications
- Peer-to-peer applications
- IP fragmentation with NAPT enroute
- Applications requiring retention of address mapping
- Applications requiring more public addresses than available
- Encrypted protocols like IPsec, IKE, Kerberos
## Possible mitigation
L'approccio più semplice prevede lo sviluppo di applicazioni che evitino di incorporare informazioni IP nei loro payload. Un altro metodo efficace combina NAT con Application Layer Gateway (ALG), che gestiscono le traduzioni specifiche del protocollo per applicazioni come FTP, SIP e SMTP modificando sia le intestazioni dei pacchetti che il contenuto del payload. Per gli scenari peer-to-peer, Interactive Connectivity Establishment (ICE) offre una soluzione affidabile sfruttando i server STUN e TURN per facilitare l'attraversamento NAT. Tuttavia, queste soluzioni rimangono inefficaci per il traffico crittografato, dove l'ispezione e la modifica del payload sono impossibili.
## Hole punching
Technique used for connecting two hosts that are both behind NAT is called Hole punching. A method for establishing bidirectional connections between Internet hosts, both in private networks using NAT.

**Main Idea**
Find the public IP address of the other peer and initiate a connection to create a
NAT state, so that replies can be correctly passed.

>STUN: Session Traversal Utilities for NAT is used for this purpose, discovery and help two peers to communicate

```ad-example
title:Example of third party for NAT traversal
![[14a.png]]
![[15a.png]]

```


# Iptables Tables and chains

```ad-abstract
title: Definizione
`iptables` è uno strumento di firewall per Linux che controlla il traffico di rete. Funziona applicando **regole** ai pacchetti che entrano o escono dal sistema.

```

Le regole di iptables sono organizzate in ==tabelle==, ognuna con uno scopo specifico:
- filter $\to$ tabella predefinita utilizzata per filtrare pacchetti (accettare o bloccare)
- nat → usata per **modificare indirizzi IP e porte** (es. NAT, DNAT, SNAT)
- mangle → modifica avanzata di pacchetti (TTL, TOS, flag TCP…)
- raw → per bypassare il tracking delle connessioni (conntrack)
- security → per etichettature legate a SELinux

Ogni tabella contiene una o più ==chains==, ovvero sequenze di regole applicate in diversi momenti del transito del pacchetto. 

Ogni catena contiene una **lista ordinata di regole**, e ogni regola definisce:
- una condizione
- un'azione (==target==) da applicare se la condizione è vera

```ad-question
title: Come vengono applicate le regole?
1. Ogni pacchetto che passa per una catena viene confrontato **con tutte le regole in ordine**.
2. Appena **una regola corrisponde** (`match`), viene applicato il **target** specificato.    
3. Dopo l'applicazione del target, il pacchetto **non viene più confrontato** con le regole successive (salvo eccezioni, come `LOG` o `CONTINUE`).

```

To see chains and rules of the filter table type:
`IPTABLES -l` or for extended output `iptables -L -n -v --line-numbers`

## Filter table
```ad-abstract
title: Definizione
La ==tabella filter== è la tabella predefinita di `iptables`, usata per decidere se permettere o bloccare i pacchetti.

```

Ha tre catene principali integrate:
- `INPUT`: usata per i pacchetti **destinati al sistema stesso**
- `OUTPUT`: usata per i pacchetti **generati dal sistema** e diretti verso l’esterno
- `FORWARD`: usata per i pacchetti che **passano attraverso il sistema**, cioè che vengono inoltrati da una rete a un'altra

Se un pacchetto **non corrisponde a nessuna regola** in una catena, si arriva alla **fine della catena**. A quel punto, viene applicata la **"politica di default" (policy)** della catena, che può essere: 
- DROP: scarta il pacchetto senza avviso
- ACCEPT: lascia passare il pacchetto
- REJECT: Scarta il pacchetto ed invia un messaggio di errore

![[33a.png]]

## Useful iptables command switches
![[34a.png]]
![[35a.png]]
![[146a.png]]
## More on the conntrack module
Clever use of logic to recognize connections, even with connection-less
protocols (UDP, ICMP...).
![[147a.png]]

## iptables: four built-in tables
1. ==MANGLE==: manipulate bits in TCP header
2. ==FILTER==: packet filtering
3. ==NAT==: network adress translation (modificare indirizzi IP e porte)
4. ==RAW==: exceptions to connection tracking
	- When present RAW table has the highest priority
	- Used only for specific reasons
	- Default: not loaded

All of them are independent but are used in a logical iptables.
All for different purpose.
## MANGLE table
```ad-abstract
title: Definizione
La **tabella `mangle`** è usata per **modificare i campi dell’header IP** dei pacchetti, **non** per filtrare o fare NAT.

```

Serve per manipolazioni avanzate, ad esempio:
- **TTL (Time To Live)** → limite di “salti” del pacchetto
- **TOS/DSCP (Type of Service / Differentiated Services)** → priorità del traffico (QoS)
- **Flag TCP** → come `SYN`, `ACK`, ecc.

>**Uso tipico:** ottimizzazione del traffico, marcatura pacchetti, qualità del servizio (QoS)

==Five chains to alter==:
-  **PREROUTING**: incoming packets before a routing decision
- **INPUT**: packets coming into the machine itself
- **OUTPUT**: locally generated outgoing packets
- **FORWARD**: packets being routed through the machine
- **POSTROUTING**: packets immediately after the routing decision

## NAT table
Used for ==NAT (Network Address Translation)==: to translate the packet's source field or destination field
- Only the first packet in a stream will hit this table (the rest of the packets will automatically have the same action)
We have different special targets (packet fates/actions):
- **DNAT**: destination nat
- **SNAT**: source nat
- **MASQUERADE**: dynamic nat (when fw interface address is dynamically assigned) (we don't specify the IP address because he use the ip of the outgoing that the  interface has at the moment of intercept the packet)
- **REDIRECT**: redirects the packet to the machine itself

### NAT'ing targets
**DNAT**: Destination address translation
- Transform the destination IP of incoming packets
- Used in PREROUTING chain
**SNAT**: Source address translation
- Transform the source IP of outgoing packets
- Can be done one-to-one or many-to-one
- Used in POSTROUTING chain
**MASQUERADE**: like SNAT but the source IP is taken form the dynamically assigned address of the interface

## Chain and Table priorities
![[148a.png]]
## User defined chains
It is possible to specify a jumprule to a different chain withinthe same table.
The new chain must be userspecified If the end of the user specified chain is reached, the packet is sent back to the invoking chain.

![[149a.png]]


## iptables logging
LOG as possible target
- "non-terminating target", i.e. rule traversal continues at the next rule
- to log dropped packets, use the same DROP rule, but with LOG target
When this option is set for a rule, the Linux kernel will print some information on all matching packets (like most IP header fields) via the kernel log (where it can be read with dmesg or syslogd(8))
`-- log-level level`: specifies the type of log (emerg, alert, crit, err, warning, notice, info, debug)
`--log-prefix prefix`: add further information to the front of all messages produced by the logging action

```ad-example
title: Log example
![[150a.png]]

```

If we don't consider the mangle, is quite simple!