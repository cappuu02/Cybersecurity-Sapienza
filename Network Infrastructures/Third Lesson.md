## ADSL frequency bands
ADSL uses two separate frequency bands, referred to as the upstream and downstream bands
- The upstream band is used for communication from the end user to the telephone central office
- The downstream band is used for communicating from the central office to the end user.

## ADSL frequency Allocation

![[Network Infrastructures/images/2.png]]
>binder group: table with multiple copper go together

## Cross-Talks
Wires sharing the same cable interfere one each other.

![[Network Infrastructures/images/3.png]]
## ADSL and cross-talks

Two kinds of cross-talk noise exist: far-end cross-talk (FEXT) and near-end cross-talk (NEXT). Depend on:
- The power spectral density of the transmitted signal
- The number of twisted pairs in the same cable
- The overlapping of bandwidths of the useful signal and the interfering ones
- Crosstalk typically increases with frequency $\to$ significant impairment for high speed DSL
## FEXT
FEXT is the cross-talk between a transmitter and a receiver placed on opposite sides of the cable:
- FEXT signals travel the entire length of the channel
- Since for ADSL “short” cables are used, the signal carried on other pairs, even though coming from far away, are not strongly attenuated and create interferences that affect other pairs.
- To reduce this kind of noise a cable usually doesn't contain more than a dozen twisted pairs.
- 
![[Network Infrastructures/images/5.png]]

>This configuration append when two user transmit an `upstream`.
>Can we have FEXT....?
>Can exist an interferation closed to the transmitter

## NEXT
NEXT is the cross-talk between a transmitter and a receiver placed on the same side of the cable.
Receiver's signals are softer than transmitter's one, since come from far away and thus there is a strong interference which reduces quality of useful received data. NEXT is one of the reason of the frequency
division for upstream and downstream in ADSL.

![[Network Infrastructures/images/4.png]]

## Echo cancelled
If the central office is able to understand that there is a signal to the upstream
![[Network Infrastructures/images/7.png]]


## Principle of DMT modulation
- Divide the operational ADSL bandwidth into very small subchannles
- Discrete carriers (or tones) are used in the center of each data subchannel
- These carriers are used to transmit data independently in each subcarrier by means of a specified QAM modulation.

![[Network Infrastructures/images/8.png]]

>flat behavior = problem

idea: instead of considering this bandit as unique, let as divide this band in multiple sub-bands. each of this pieces is $4KHz$. Look the third image to understand. if we look ate the small pieces is it flat. If we look the entire, is not flat.

>In ADSL a single piece is called 'Tone'.

## DMT modulation

![[Network Infrastructures/images/9.png]]

Independent subchannels can be manipulated individually with consideration of the line conditions
- If a subchannel is experiencing external interference it may not be used in favor of other subchannles
- DTM can dynamically adapt the data rate to the line conditions
- Theoretical maximum upstream bandwidth:
	- 25 channels X 15 bit/s/Hz/channel X 4 KHz= 1.5 Mbit/s
- Theoretical maximum downstream bandwidth:
	- 249 channels X 15 bit/s/Hz/channel X 4 KHz= 14.9 Mbit/s


