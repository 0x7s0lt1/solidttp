// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Http{

    address owner;
    address httpProvider;

    constructor(){
        owner = msg.sender;
        httpProvider = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }


    modifier onlyHttpProvider() {
        require(msg.sender == httpProvider, "Only the http provider can call this function");
        _;
    }


    event Get(string url, string headers, string onSuccess, string onError);
    event Post(string url, string headers, string data, string onSuccess, string onError);


    function get(string memory url) public onlyOwner {
        
        emit Get(url,"","OnSuccess", "OnError");

    }

    function OnSuccess (string memory _content) public view onlyHttpProvider returns (string memory){

        return _content;
    }

    function OnError (string memory _message) public view onlyHttpProvider returns (string memory){

        return _message;
    }


}