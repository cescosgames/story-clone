# Work In Progress Notes

## End of project changes
In the story holder, when saving our stories array (handleImageUpload function), we are using a temporary URL. This does not get 
saved in local storage. To save to local storage, we need to convert our url to base64 string. 

### current working on...
stories are functioning, sorting properly and opening properly. Next step is going to be...
<br>
- handle deletion after time
- moving through stories works when all stories are seen, stories changing index is not working as intended. Need to find out how to progress stories 
in chronological -> seen order.
- review handle story seen function
- how to add multiple, independent loading bars up top