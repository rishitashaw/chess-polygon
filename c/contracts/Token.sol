pragma solidity ^0.8.4;

contract Token {
    mapping(address => uint256) balances;

    event Transfer(address sender, address receiver, uint256 amount);

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        //emit Transfer(msg.sender, to, amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
    // In a Batch

    // function transfer(address[] memory receivers, uint amount) public {
    //     require(balances[msg.sender] >= receivers.length * amount, "Insufficient funds");
    //     for (uint i=0; i<receivers.length; i++) {
    //         emit Transfer(msg.sender, receivers[i], amount);
    //         balances[msg.sender] -= amount;
    //         balances[receivers[i]] += amount;
    //     }
    // }
}
