<style>
.time {
    display: flex;
    flex-direction: column;
}

.time label {
    margin-bottom: 10px;
}

.time-inputs {
    display: flex;
    align-items: center;
}

.time-inputs input {
    margin-right: 10px;
}
</style>
<!-- Include configuration file -->
<?php include_once 'config.php'; ?>
<?php
$postData = '';
if (!empty($_SESSION['postData'])) {
    $postData = $_SESSION['postData'];
    unset($_SESSION['postData']);
}

$status = $statusMsg = '';
if (!empty($_SESSION['status_response'])) {
    $status_response = $_SESSION['status_response'];
    $status = $status_response['status'];
    $statusMsg = $status_response['status_msg'];
}
?>
<!-- Status message -->
<?php if (!empty($statusMsg)) { ?>
    <div class="alert alert-<?php echo $status; ?>"><?php echo $statusMsg; ?></div>

    <?php } ?>
    <div class="col-md-12">
        <form method="post" action="addEvent.php" class="form">
            <div class="form-group">
                <label>Kies een titel</label>
                <select name="title" class="form-control" required>
                    <option value="werk vuurlinie" <?php echo ($postData['title'] == 'werk vuurlinie') ? 'selected' : ''; ?>>Werk Vuurlinie</option>
                    <option value="werk VR-cafe" <?php echo ($postData['title'] == 'werk VR-cafe') ? 'selected' : ''; ?>>Werk VR-Cafe</option>
                </select>
            </div>
            <div class="form-group">
                <label>Event Description</label>
                <textarea name="description" class="form-control"><?php echo !empty($postData['description']) ? $postData['description'] : ''; ?></textarea>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" name="location" class="form-control" value="<?php echo ($postData['title'] == 'werk vuurlinie') ? 'noorderweg 9a' : (($postData['title'] == 'werk VR-cafe') ? 'stationsplein 68' : ''); ?>" required>
            </div>
            <div class="form-group">
                <label>Date</label>
                <input type="date" name="date" class="form-control" value="<?php echo !empty($postData['date']) ? $postData['date'] : ''; ?>" required>
            </div>
            <div class="form-group time">
    <label>Time</label>
    <div class="time-inputs">
        <input type="time" name="time_from" class="form-control" value="<?php echo !empty($postData['time_from']) ? $postData['time_from'] : ''; ?>">
        <span>TO</span>
        <input type="time" name="time_to" class="form-control" value="<?php echo !empty($postData['time_to']) ? $postData['time_to'] : ''; ?>">
    </div>
</div>

        <div class="form-group">
            <input type="submit" class="form-control btn-primary" name="submit" value="Add Event"/>
        </div>
    </form>
</div>