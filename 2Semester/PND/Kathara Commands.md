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