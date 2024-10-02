# The Unix File system
Even though files and directories, for the user, are usually logically organized according to an ordered tree structure, the computer does not actually know the meaning of this representation. Permanent data is stored on disk blocks of fixed size. A disk is usually divided into partitions and each partition has its own structure, a filesystem. 

>Image of filesystem divided in a three structure

>every partitions has his own filesystem.

The set of filesystems forms the tree structure with which the user interacts.
File names and paths are meaningful to the user, but the Unix/Linux OS identifies them by their inodes.
An inode number is unique identifier associated with a data structure (inode) containing information on the properties of the file and the physical location of the data that constitute the file itself.
Each partitions has its own set of inodes, space for them is usually created during the installation of OS.

- First of all, a filesystem must be created on the disk partition
	- news
	- mkfs
- To be accessible a file system must be mounted on a mountpoint
- The mountpoint is then covered by the mounted file system.
	- Kernel maintains data structures for mount table and vfs list

```ad-missing
title: Missing image filesystem Mount

when we mount a filesystem into userfile. The scheme is the same such like the structure.

```

## The layout of s5fs partition

`[B|S|INODE LIST|DATA BLOCKS]`

_Directory_
```c
[73|.]
[38|..]
[9| file1]
[0| deleted file]
[110| subdirectory 1]
[65| archana]
```

>`.` indicate the current directory.
>`..` indicate the parent's directory.

## The inode
Each file an associated inode with the following information:
- File length in bytes.
- ID of the device containing the file.
- User ID OF THE FILE OWNER AND GROUP Id OF THE FILE.
- Inode number.
- File mode wich determinates the type and access and execution permissions of the file.
- data last modification, last access and last modification of the inode.
- link number which indicates the number of hard-links connected to the inode.

## The superblock

Each filesystem has this special block stored in multiple (locations for redundancy), containing:
- size in blocks of the filesystem
- Size of the inode list
- Number of tree blocks and inodes
- Free block list
- Free inode list

>whit this info i can do everything.

```ad-missing
title: Missing Image of free block list

All modern filesystems use bitmaps.
```

```ad-missing
title: Missing image of inode structure
The pointer block permit to memorize a lot of addresses.

```

## File Attributes
`ls -lis test.txt` = ls is the most used command to see information about a file. explain us information such as data, name, size in bytes.

>A general file .txt occupate in media $1024$ bytes but use only $213$ Kb, this is a waste of memory (problem). In C remember always to free memory!

_Each file is associate with_
- a user who owns the file
- a group with special rights to the file

_How to identify users and groups_
- user id; username
- group id; groupname

_How to associate a user with a file:_
- When you create a file, it is associated with your user id
- you can change the owner with:
	- `chown newUserId file(s)`
	- (Normally not available in a system where system quotas are managed).

_How to get the list of groups you belong to_
- `groups [username]`
- invoked without arguments, lists the groups you belong to;
- indicating username, returns the groups associated with userna,e

How to associate a group with a file
.....FINIRE......


# File Permission
Each file is associated with $9$ flags called "permission bits".

==Read==:
- regular files: ability to read the contents
- directory: ability to read the list of files contained in a directory

==Write==:
- Regular files: ability to edit content
- directory: ability to add, remove, rename files

==Execute==:
- regular files: ability to execute th file
- directory: possibility to cd to the directory or access it via path

In reality, permission management is slightly more complicated.

When a ==process== is running, it has:
- A real user ID / Group ID
- An effective user ID / GROUP ID to allow execution on behalf of another user

When process is created, they are set to the same value.

_What permission are used?_
If the effective user ID of the process matches file owner ID $\to$ User permissions.
Else if the effective group ID matches file owner GID $\to$ group permissions
Else other permissions apply

## Change permissions
- R (READ)
- W (WRITE)
- X (EXECUTE)

`chmod u+x script.sh`
See man chmod for other details.

# Links
`ln file hlink`
Creates an hard link: an entry, in the current directory, called hlink with the same inode number as file. The link number in the inode is incremented by 1.

>Regular user cannot create hard link to directories (not must exist loop into filesystem).

`ln -s file slink`
Creates a symbolic link, a special file, in the current directory, named slink which points to file. The link number in the inode is not increased. Beware loops in the filesystem (but the shell has a way to break them).

if `file` is removed:
- hard link: inode link number is decremented, but file blocks are not deleted until the link number becomes $0$
- symbolic link: the link becomes "stale", i.e. it points to a non-existent file.
``
