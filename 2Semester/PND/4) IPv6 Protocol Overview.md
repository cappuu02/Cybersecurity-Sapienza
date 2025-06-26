> PDF 07 classroom
## IPv6 Address Types
![[104a.png]]

## SLAAC: Random 64-bit Interface ID
![[105a.png]]

**Temporary Addresses**
Idea: Forniscono indirizzi aggiuntivi con durata relativamente breve, utilizzati come indirizzo sorgente per l'avvio delle connessioni. Stesso prefisso di un indirizzo pubblico, valore randomizzato per l'ID interfaccia. Durata breve, solitamente ore o giorni. È comune disporre di più indirizzi temporanei per garantire che le connessioni esistenti possano continuare mentre viene creato un nuovo indirizzo temporaneo per le nuove connessioni.

![[106a.png]]

## IPv6 Multicast Addresses
![[107a.png]]
A multicast address allows a device to send a single packet to multiple destinations simultaneously (one-to-many communication). In IPv6, this is similar to the **224.0.0.0/4** range in IPv4. There are two main types of multicast addresses: **assigned** (predefined for specific functions) and **solicited-node** (used for efficient neighbor discovery).

- IPv6 Source – Always a unicast
-  IPv6 Destination – Unicast, multicast, or anycast.

| 8 bit | 4 bit | 4 bit | 112 bit  |
| ----- | ----- | ----- | -------- |
| ff    | flags | scope | Group ID |
- Prefisso `ff` identifica indirizzo multicast
- Flags `4 bit` identifica:
	- `0000` per multicast assigned
	- `0001` per solicited-node
- Scope `4 bit` limita l'ambito di propagazione (dove il pacchetto multicast può viaggiare)
- Group ID identifica il gruppo multicast (identifica chi deve ricevere il pacchetto)

```ad-abstract
title: Assigned vs Solicited
==Assigned==: Indirizzi multicast predefiniti dallo IANA per funzioni specifiche con lo scopo di comunicazioni one-to-many per servizi noti. 
- Statici
- Globalmente riconosciuti
- Usati per scopi generici

==Solicited-node==: Indirizzi multicast temporanei generati automaticamente con scopo di ottimizzare il NDP (sostituto ARP IPv4).
- Dinamici
- Limitati al link-local scope
- Usati solo per risolvere indirizzi MAC

```


### Multicast Range
![[108a.png]]

>`FF00::/8` indica che solo i primi $8$ bit sono fissi (`FF`)
>Tutti gli indirizzi che iniziano con `FF` sono multicast

### Scope
The **scope** is a 4-bit field in an IPv6 multicast address that determines the **reach of the multicast packet**. It specifies how far the traffic can propagate within the network. Here are some of the key scope values:  

- **0 (Reserved)** – Currently unused.  
- **1 (Interface-Local scope)** – Limits the packet to a single interface, preventing it from being forwarded.  
- **2 (Link-Local scope)** – Restricts the packet to the local network segment LAN.  
- **5 (Site-Local scope)** – Confines the packet to a specific site or organization, similar to private addressing in IPv4.  
- **8 (Organization-Local scope)** – For an organization.
- **E (Global scope)** – Enables worldwide distribution, meaning the packet can traverse the entire internet.  

>This structure ensures efficient and controlled delivery of multicast traffic based on its intended range!

![[110a.png]]

==Flag field==
• $0$ - Permanent, well-known multicast address assigned by IANA.
	• Includes both assigned and solicited-node multicast addresses.
• $1$ - Non-permanently-assigned, “dynamically" assigned multicast address.
	• An example might be `FF18::CAFE:1234`, used for a multicast application with organizational scope.

![[Pasted image 20250624093648.png]]

## Assigned IPv6 Multicast Addresses
![[111a.png]]
L'**RFC 2375** è uno standard IETF che definisce l'assegnazione iniziale degli **indirizzi multicast IPv6** con **Group ID permanenti**, gestiti dallo **IANA**.

## Assigned Multicast Addresses with Link-local Scope
La tabella mostra indirizzi multicast **well-known** usati per scopi specifici nella rete locale:
![[112a.png]]

>Tali indirizzi con scope link local non sono instradabili oltre la rete locale. Sono utilizzati principalmente per protocolli di rete!
## Assigned Multicast Addresses with SIte-Local Scope
![[Pasted image 20250625115020.png]]
Used to communicate within a “site”, possibly routed within the site.
- Must have `IPv6` multicast routing enabled:



	## DHCPv6 without and with relay agents
![[113a.png]]

Immagine a sinistra: ==DHCPv6 senza relay agent==
1. **Client**: Router solicitation.
2. **Router**: Router Advertaisement.
3. **Client**: invia un messaggio `SOLICIT` per cercare un server disponibile.
4. Il **server** gli risponde dicendo che è disponibile.
5.  l **client** fa una `REQUEST` , ovvero chiede un indirizzo completo o solo opzioni.
6. **Server** effettua una `REPLY`, assegnando l'indirizzo o fornendo le opzioni richieste.
7. il **Client** rinnova il lease prima che scada con `RENEW`.
8. Il **server** conferma il rinnovo `REPLY`.
9. Quando il **client** si spegne o non vuole più usare l'indirizzo, lo rilascia con `RELEASE`.

>Caso in cui Client e server DHCP sono nella stessa rete (stesso link IPv6).

Immagine a sinistra: ==DHCPv6 con relay agent==
1. **Router Solicitation**
2. **Router Advertisement**  
3. **SOLICIT**: Il client invia un messaggio SOLICIT.
4. **RELAY-FORWARD**: Il router (relay agent) riceve il SOLICIT e lo **inoltra al server**.
	1. **RELAY-REPLY**: Il server risponde con ADVERTISE, ma lo manda **al router** (relay agent), non direttamente al client.
5. **ADVERTISE**: Il router inoltra la risposta al client.
6. **REQUEST o INFORMATION REQUEST**: Il client chiede un indirizzo o opzioni.
7. **RELAY-FORWARD**: Il relay agent inoltra di nuovo verso il server.
8. **RELAY-REPLY**: Il server risponde.
9. **REPLY**: Il router inoltra la risposta finale al client.

>Usato quando **il client e il server DHCPv6 NON sono sulla stessa rete/link**.

>Serve un **relay agent**, spesso integrato in un router, per **inoltrare i messaggi DHCPv6** tra client e server.


## “All IPv6 Devices” Assigned Multicast Address

![[114a.png]]

`FF02::1` è un indirizzo multicast IPv6 **link-local** che rappresenta **tutti i dispositivi IPv6** sulla stessa rete locale (segmento di LAN). Equivalente al concetto broadcast IPv4 ma più efficiente.

Ogni dispositivo IPv6 **si unisce automaticamente** al gruppo `FF02::1` all'avvio dell'interfaccia di rete. Chi si unisce a questo gruppo elabora i pacchetti inviati a questo indirizzo.

```ad-question
title: Is this the same as a broadcast?
A differenza dei broadcast IPv4, che inondano il traffico verso tutti i dispositivi, i multicast IPv6 sono più efficienti, inviano solo ai dispositivi interessati. **FF02::1** viene mappato a uno specifico indirizzo MAC multicast di Livello 2, riducendo il sovraccarico di rete non necessario.

```

>Questo approccio garantisce che la comunicazione rimanga ottimizzata, evitando le inefficienze del traffico broadcast tradizionale.

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

- IPv4 Version contains $4$.
- IPv6 Version contains $6$.
```

```ad-info
title: Internet Header Length (IHL)

- IPv4 header variabile da $20$-$40$ byte
- IPv6 header fisso a $40$ byte
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

```

## IPv6 Flow Label
```ad-abstract
title: Definition
Il ==Flow Label== è un campo **nuovo ed esclusivo di IPv6**, assente in IPv4. È progettato per ottimizzare il trattamento dei pacchetti appartenenti allo stesso flusso di dati, migliorando l'efficienza del routing e la gestione della qualità del servizio (QoS).

```

>Flusso di dati: Un insieme di pacchetti correlati (es. una connessione TCP, uno streaming video)

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
For both protocols (IPv4 - IPv6), the field indicates the type of header following the IP header.

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
**IPv4 Header Checksum**
- **Presente**: Un campo (16 bit) che verifica l'integrità dell'header IPv4.
- **Svantaggio**: Ogni router deve ricalcolarlo, rallentando l'inoltro.

**IPv6: Niente Header Checksum**
- **Eliminato**: Ottimizzazione per prestazioni (header fisso + meno overhead).
- **Alternative**:
    - **TCP/UDP** gestiscono l'error-checking (checksum obbligatori).
    - **UDP** in IPv6 richiede _sempre_ il checksum (in IPv4 era opzionale).

**Risultato**:
- **Più veloce**: Meno elaborazione nei router.
- **Sicuro**: L'integrità è garantita a livello di trasporto (TCP/UDP).


## IPv4 Options and Padding

IPv4 (Complesso)
- **Header variabile** (20-60 byte) con campi opzionali:
    - **Options**: Aggiungono funzionalità (es. timestamp, routing sorgente) ma richiedono _padding_ per allineamento a 32 bit.
    - **Overhead**: Ogni router deve analizzare e riallineare l'header, rallentando l'elaborazione.

IPv6 (Semplificato)
- **Header fisso** (40 byte) **senza opzioni integrate**.
- **Extension Headers** (modulari e opzionali):
    - **Sostituiscono le IPv4 options** (es. `Fragment Header` per la frammentazione, `IPsec Header` per la crittografia).
    - **Aggiunti solo se necessari**, dopo l'header principale.

## IPv6 Extension Header

Next Header (nel main header IPv6) indica:
    - Il **protocollo successivo** (es. TCP, UDP, ICMPv6)
    - **La presenza di un extension header**

Gli Extension Headers:
    - Sono inseriti tra l'IPv6 Main Header e i dati.
    - Offrono **flessibilità** per nuove funzioni (es. sicurezza, frammentazione, routing).
    - Mantengono la dimensione fissa del main header per **efficienza**.

![[120a.png]]

![[121a.png]]

## IPv4 options vs. IPv6 extensions
![[122.png]]
IPv6 extensions (except Hop-by-Hop) are processed only by the destination.

## Order is important (RFC 8600 Section 4)
![[123a.png]]
