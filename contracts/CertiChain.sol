pragma solidity ^0.4.22;
pragma experimental ABIEncoderV2;

contract CertiChain {
    
    struct Certificate {
        string cId;
        string hash;
        string location;
        uint sId;
    }

    struct Student {
        string uId;
        string name;     
        string[] certificateId;
    }


    mapping(string => Student) studentMapping;
    mapping(string => Certificate) certificateMapping;

    //add certificate data and the faculty who is adding the certificates
    function setCertificateData(string _cId,string _hash,string _location,uint _sId) public payable returns(uint){

        Certificate certificate;
        certificate.cId =_cId;
        certificate.hash =_hash;
        certificate.location =_location;
        certificate.sId = _sId;
        certificateMapping[_cId] = certificate; 
        return 1;
    }
  

    //Retrieve the location of the certificate
    function getCertificateLocation(string _cId,string _hash) public view returns (string,uint) {
        
        string hashInserted = certificateMapping[_cId].hash;
        bool flag = compareStrings(hashInserted,_hash);
        if(flag == true){
            return (certificateMapping[_cId].location,1);
        }
        else{
            return ("hash not matched",0);
        }
        
    }

    // Cannot directly compare strings in Solidity
    // This function hashes the 2 strings and then compares the 2 hashes
    function compareStrings(string a, string b) internal returns (bool) {
        return keccak256(a) == keccak256(b);
    }

    //find all the certificates given by a staff
    function getStaff(string _cId) public view returns (uint) {
        return (certificateMapping[_cId].sId);
    }
   

}
