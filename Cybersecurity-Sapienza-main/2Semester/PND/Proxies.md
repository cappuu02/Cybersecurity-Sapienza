- Forward proxy
- Reverse proxy
- Application proxy
- Transparent proxy

## Proxy history: forward proxy
A WWW proxy server provides access to the Web for people on closed subnets who can only access the Internet through a firewall machine.

Original idea: An application-level proxy makes a firewall safely permeable for users in an organization, without creating a potential security hole through which “bad guys” can get into the organizations’net.

>Namely: one single host handling requests from several users

## Normal HTTP transaction
![[2Semester/PND/images PND/200.png]]

## Proxied HTTP transaction
![[2Semester/PND/images PND/201.png]]

## Proxied FTP transaction
![[2Semester/PND/images PND/202.png]]

Se utilizziamo https con proxy abbiamo un problema che dal proxy server al client le informazioni vengono scambiate in chiaro!

## Other benefits of forward proxy
Authentication, Authorization, Auditing, whitelisting, blacklisting...
- ==Caching==
	- store the retrieved document into a local file for further use so it won’t be necessary to connect to the remote server the next time that document is requested
- ==Problems==:
	-  How long is it possible to keep a document in the cache and still be sure that it is up- to-date?
	-  How to decide which documents are worth caching and for how long?
- ==Solutions==:
	-  HEAD http request (very inefficient)
	- If-Modified-Since request header

## Forward proxy
HTTP requests
- Standard request in absolute-form to the proxy
- The proxy will be the middle-point, forwarding the request towards the final termination
Other (non-HTTP requests)
- HTTP tunneling
-  HTTP CONNECT request with absolute-form to the proxy
- The proxy establishes the TCP connection and becomes the middle-point

## HTTP tunneling: HTTP CONNECT

If we want to use HTTPS, with proxy we have a problem!

Allow the use of any protocol that uses TCP https://tools.ietf.org/html/draft-luotonen-web-proxy-tunneling-01

==Idea==: the proxy simply receives the destination host the client wants to connect to and establishes the connection on its behalf

Then, when the connection is established, the proxy server continues to proxy the TCP stream unmodified to and from the client

Clearly, the proxy can perform authentication, whitelisting, and so on before accepting to forward the stream of data

## HTTP CONNECT method
![[2Semester/PND/images PND/203.png]]
Anything that uses a two-way TCP connection can be passed through a CONNECT tunnel
> Not all proxy servers support the CONNECT method or limit it to port 443 only

>client use the server certificate so the PK of the server!

>proxy cannot see what we send (Proxy know the destination but can't read the content of our data.) non può leggerle perchè il client utilizza la pk del server!!!

```ad-important



Il metodo HTTP CONNECT permette di creare un tunnel di comunicazione diretta attraverso un server proxy. Ecco come funziona:

1. Il client invia una richiesta "CONNECT" al proxy (es. "CONNECT cnn.com:443")
2. Il proxy stabilisce una connessione TCP con il server di destinazione
3. Il proxy risponde al client con "200 Connection Established"
4. Si crea un canale diretto tra client e server, con il proxy che inoltra i dati senza leggerli

Caratteristiche principali:

- Utilizzato principalmente per connessioni HTTPS attraverso proxy
- Il proxy vede solo la destinazione, non il contenuto dei dati (che possono essere criptati)
- Permette al client di eseguire l'handshake SSL/TLS direttamente con il server
- Alcune limitazioni: non tutti i proxy lo supportano o lo limitano alla porta 443

È fondamentale per navigazione sicura, WebSocket e altre comunicazioni bidirezionali attraverso proxy.
```


## Content-filtering proxy
After user authentication, HTTP proxy controls over the content that may be relayed
- In schools, no Facebook or porn websites
	- Blacklists or semantic searches
-  Virus, malware scan
- No files with executable or watermarking and so on

## Anonymizer proxy
A proxy server that acts as an intermediary and privacy shield between a client computer and the rest of the Internet. It accesses the Internet on the user's behalf, protecting personal
information by hiding the client computer identifying information (IP Address, firstly) . The server sees requests coming from the proxy address rather than the actual client IP address

>Proxy, made the request instead of me but usually is not in the same network respect to us.

![[2Semester/ETH/Images/71.png]]

## SSL Forward proxy
A way to decrypt and inspect SSL/TLS traffic from internal users to the web, generally
implemented in firewall. SSL Forward Proxy decryption prevents malware concealed as SSL encrypted traffic from being introduced in the network

==How it works==:
-  The proxy uses certificates to establish itself as a trusted third party to the session between the client and the server
-  As the proxy continues to receive SSL traffic from the server that is destined for the client, it decrypts the SSL traffic into clear text traffic and applies decryption and security profiles to the traffic
-  The proxy, then, re-encrypts and forwards the traffic to the client
	- What about trust?

![[2Semester/PND/images PND/204.png]]

>proxy can inspect what we send

In questo caso il firewall che sarebbe un proxy avvia la connessione ssl con il server ed ottiene il certificato. il firewall utilizza la PK del server fa una copia ed invia un certificato differente al client che invece utilizzerà la chiave pubblica del firewall. in questo caso il proxy può leggere le informazioni scambiate.

## Reverse Proxy
Forward proxy operates on behalf of the client
-  Reverse proxy operates on behalf of the server
- It receives the requests from the outside as if it were the server and then forwards the request to the actual destination (origin) server
- Typical functions:
	- Load balancing
	- Cache static content
	- Compression
	- Accessing several servers into the same URL space
	- Securing of the internal servers
	- Application level controls
	- TLS acceleration

![[2Semester/PND/images PND/205.png]]

>Il reverse proxy riceve le richieste dai client esterni come se fosse il server di destinazione, e poi inoltra queste richieste ai server reali (origin server) che sono posizionati nella rete interna. Questo crea un livello di astrazione tra i client esterni e i server interni

## Internal server protection
The reverse proxy receives the requests from the clients and then issues new, prim and proper requests to the real server.
- No direct connection with the outside also means defense against DoS
-  Can provide support for HTTPS to servers that only have HTTP
-  Can add AAA to services that do not have them

## Reverse proxy for IoT access
![[2Semester/ETH/Images/72.png]]

## Reverse proxy for application control: application firewall
Application layer firewall operates at the application layer of a protocol
stack. A WAF (Web Application Firewall) inspects the HTTP traffic and prevents attacks,
such as SQL injection, cross-site scripting (XSS), file inclusion, and other types
of security issues
- Example: ModSecurity for apache webserver
- It can block application input/output from detected intrusions or malformed communication, or block contents that violate policies
- It can detect whether an unwanted protocol is being provided through on a non-standard port or whether a protocol is being abused in any harmful way

## TLS acceleration
The SSL/TLS "handshake" process uses digital certificates based on asymmetric or public key encryption technology.

Public key encryption is very secure, but also very processor-intensive and thus has a significant negative impact on performance
-  SSL bottlenecks
Possible solutions:
-  SSL acceleration: use hardware support to perform modular operations with large operands
- SSL offloading: use a dedicated server only for SSL handshak

## SSL offloading
==SSL Termination==
-  The proxy decrypts the TLS/SSL-encrypted data and then sends it on to the server in an unencrypted state
-  This also allows IDS or application firewall inspection

==SSL Forwarding== (or Bridging or Initiation)
The proxy intercepts and decrypts TLS/SSL-encrypted traffic, examines the contents to ensure that it doesn't contain malicious code, then re-encrypts it before sending it on to the server
This only allows inspection of TLS/SSL-encrypted data before it reaches the
server to prevent application layer attacks hidden inside

## Proxy and HTTPS
HTTPS traffic (fortunately) cannot be read
What if we WANT to read a client HTTPS traffic?
We need to perform a Man-in-the-middle attack
- PRETEND to be the real server and be the termination of the SSL/TLS connection
A possible solution is the SSL bump
It consists in using the requested host name to dynamically generate a server certificate and then impersonate the named server.

## HTTPS certificate dilemma