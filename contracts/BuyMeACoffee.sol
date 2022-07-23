// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyMeACoffee {
    //Event to emit when a Memo is created
    event NewMemo(address indexed from, uint timestamp, string name, string message);

    //Memo struct.
    struct Memo{
        address from;
        uint timestamp;
        string name;
        string message;
    }

    //List of all memos recived from friends.
    Memo[] memos;

    //Address of owner
    address payable owner;

    constructor(){
        owner = payable(msg.sender);
    }

    function buyCoffee(string memory _name, string memory _message) payable public {
        require(msg.value > 0, "Can't buy coffee with 0 eth");

        memos.push(Memo(
            msg.sender, 
            block.timestamp,
            _name, 
            _message
        ));

        emit NewMemo( msg.sender, block.timestamp, _name, _message);
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    function getmemos() public view returns(Memo[] memory){
        return memos;
    }
}


//0x7d4C650c02DBABa1D2097a1B98710933Ba632C05
