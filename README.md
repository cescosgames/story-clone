# Work In Progress Notes

## End of project changes
- In the story holder, when saving our stories array (handleImageUpload function), we are using a temporary URL. This does not get 
saved in local storage. To save to local storage, we need to convert our url to base64 string. 
- need to constrain image dimensions to 1080x1920px

### current working on...
stories are functioning, sorting properly and opening properly. Next step is going to be...
<br>
- handle deletion after time
- how to add multiple, independent loading bars up top

### issues 
- uploading a story does not modify the sessionStories (i.e. 4n 1o 2o 3o if you start at 1o after uploading 4n, the index of 1o is still believed to be 0 - it doesn't
recognice the newly uploaded story)