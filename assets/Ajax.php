<?php
date_default_timezone_set('America/Montevideo');
$conn = mysqli_connect('localhost', 'root', '', 'dinorun');
if (!$conn) {
    alert('Error de conexion con la BDD.');
}
if (isset($_POST['GuardarPunto'])) {
    $Nombre = $_POST['Nombre'];
    $Score = $_POST['Score'];
    $Fecha = date("Y-m-d H:i:s");

    $sqlP = "SELECT * FROM usuario WHERE Nombre = '$Nombre'";
    $resP = mysqli_query($conn,$sqlP);
    $num_rowP = mysqli_num_rows($resP);
    $sql = "INSERT INTO usuario(Nombre, Score, Fecha)VALUES('$Nombre', $Score, '$Fecha')";
    $res= mysqli_query($conn,$sql);
    if ($res) {
        echo 1;
    }
    else{
        echo 2;
    }
}
else if(isset($_POST['BuscarRank'])){
    $sql="SELECT * FROM usuario ORDER BY Score DESC";
    $res= mysqli_query($conn,$sql);
    if ($res && mysqli_affected_rows($conn) > 0) {
        while ($row = mysqli_fetch_assoc($res)) {
            $Nombre = $row['Nombre'];
            $Score = $row['Score'];
            $Fecha = $row['Fecha'];

            ?>
            <div class="mb-3 ScoreOneUser" style="border: 1px solid #80808059;">
                <div class="row">
                    <div class="col-12"> <label class="font-weight-bold text-primary">Nombre:</label>  <?php echo $Nombre ?> </div>
                </div>
                <div class="row">
                    <div class="col-12"> <label class="font-weight-bold text-primary">Puntuación:</label>  <?php echo $Score ?> </div>
                </div>
                <div class="row mb-2">
                    <div class="col-12"> <label class="font-weight-bold text-primary">Fecha:</label>  <?php echo date("d/m/Y  H:i:s",strtotime($Fecha)); ?> </div>
                </div>
            </div>
            <?php
        }
    }else{
        ?>
        <div class="alert alert-danger"> <h4> No hay Puntuaciones guardadas </h4>  </div>
        <div class="alert alert-info"> <h6> ¿Por qué no lo haces ? </h6> </div>
        <?php
    }
}


?>