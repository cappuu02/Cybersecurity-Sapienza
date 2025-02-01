### Byzantine Reliable Broadcast
![[Pasted image 20250131162535.png]]
![[Pasted image 20250131162550.png]]
![[326.png]]
How many ready messages before delivering? There are at least $2f+1$ correct. If I see
$2f+1$ I deliver.

![[324.png]]
We need an additional mechanism $P2$ and $P4$ delivers, $P3$ does not.
==Idea==: if I see a ready message $f+1$ times, I know That at least one sender is correct.

It is not possible that two correct processes Send ready messages for different source Message (why?). Thus if I see f+1 ready, one sender is correct, It is safe for me to send a ready message.

P3: performs an "amplification" technique

####  Byzantine Reliable Broadcast Algorithm
![[325.png]]

##### Proof
**Validity**: if the sender is correct at least n-f processes do the echo (all the correct) of $m$. For our discussion of the consistent byz. Cast, we know that all corrects will send ready messages. Thus each correct receives (at least) $2f+1$ ready for m and delivers.

**No duplication**: Immediate from the auth. channel

**Integrity**: Immediate from the auth. channel

**Consistency**: A correct process p sends a ready for m only in two cases:
1) if it received from a quorum of echo.
2) if it received f+1 ready for m.
It is not possible that two correct for (1) send ready for messages different from m. For (2) is the same considering that at least one of that f+1 is correct. Thus no two corrects send ready for two different messages. Therefore, it is impossible that two corrects see 2f+1 ready for different messages (at lest f+1 of these 2f+1are correct)

**Totality**: A correct process p delivers if it sees 2f+1 ready for m. At least f+1 of these 2f+1 are correct. Therefore, any correct sees at least f+1 ready for m. This implies that any correct will amplify (if it does not send a ready upon receipt of a byzquorum of echo). There are at least 2f+1 corrects in our system, thus each correct will see at least 2f+1 ready for m, delivering.