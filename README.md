# Work In Progress Notes

## End of project changes
In the story holder, when saving our stories array (handleImageUpload function), we are using a temporary URL. This does not get 
saved in local storage. To save to local storage, we need to convert our url to base64 string. 