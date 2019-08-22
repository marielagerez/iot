<?php


class ControllerManager
{


	public function beforeRoute($f3)
    {
		$this->db= new \DB\SQL ('mysql:host=mysql-server;port=3306;dbname=smart_home','root','userpass');	
	}



}

?>
