// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract TranscriptRegistry is AccessControl {
    bytes32 public constant UNIVERSITY_ROLE = keccak256("UNIVERSITY_ROLE");

    struct Transcript {
        address issuer;
        bytes32 hash;
        string ipfsCid;
        uint256 ts;
    }

    mapping(bytes32 => Transcript) public transcripts;
    event Registered(bytes32 indexed hash, address indexed issuer, string ipfsCid);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function register(bytes32 hash, string calldata ipfsCid)
        external
        onlyRole(UNIVERSITY_ROLE)
    {
        require(transcripts[hash].ts == 0, "Exists");
        transcripts[hash] = Transcript(msg.sender, hash, ipfsCid, block.timestamp);
        emit Registered(hash, msg.sender, ipfsCid);
    }

    function isValid(bytes32 hash) external view returns (bool) {
        return transcripts[hash].ts != 0;
    }
}
