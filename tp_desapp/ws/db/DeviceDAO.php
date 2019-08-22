<?php

class DeviceDAO {

    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function getAll(){
        $result = $this->db->exec('SELECT * FROM Devices ORDER BY name');
        return $result;
    }
    public function getByType($type){
        
        if ( $type == "1" ) 
            $type=0;/*es lampara*/  
        else
            $type=1; /* es persiana */

        $data=array(1=>$type);
        $result = $this->db->exec('SELECT * FROM Devices WHERE type =? ORDER BY name',$data);
        
        return $result;
    }

    public function updateDeviceState($id,$stateValue) {
        if(is_int($id) && is_int($stateValue))
        {
            $data = array(1=>$stateValue,2=>$id);		
            $result = $this->db->exec("UPDATE Devices SET state=? WHERE id=?",$data);
            return $result;
        }
        return false;
    }

}

?>