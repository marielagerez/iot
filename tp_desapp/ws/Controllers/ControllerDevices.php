<?php

class ControllerDevices extends ControllerManager
{

	public function get($f3)
	{
		if (!empty($_GET["filter"])) 
		$valor_tipo= (int)$_GET["filter"];
		else
		$valor_tipo = 0 ; 
		  
		$devDAO = new DeviceDAO($this->db);

		if ($valor_tipo == 0)
		$result = $devDAO->getAll($valor);
		else
		$result = $devDAO->getByType($valor_tipo);
		echo(json_encode($result));
	}
	 
}

?>
