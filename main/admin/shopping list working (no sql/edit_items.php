<?php
    require_once "config.php";
    include 'dbConfig.php';

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $id = $_POST["id"];
        $newQuantity = $_POST["quantity"];

        $sql = "UPDATE items SET quantity = ? WHERE id = ?";

        if ($stmt = $db->prepare($sql)) {
            $stmt->bind_param("ii", $newQuantity, $id);

            if ($stmt->execute()) {
                echo "Item updated successfully.";
            } else {
                echo "Error updating item.";
            }

            $stmt->close();
        }
    }

    $db->close();
?>
