import Phone from "./components/Phone"

function App() {

  return (
    <>
      <Phone />
    </>
  )
}

// overview of how this works:
// A. phone component is the body that holds the entire app, styled to look like the size of a phone, roughly
// B. inside the phone component, you'll find the story holder and the body display
// B2. The body display is purely visual and will only hold information about this app
// B1. The story holder is where the magic happens, the story holder has all the functions that allow us to upload, delete, and load images as well as our modal, story thumbnails, and upload story button
// B1: story holder functions, where it all goes down (from top to bottom)
// - (outer function) getBase64Size is a function I copied directly from the internet that returns our base64 encoding size in bytes. See more on this online, I am not particularly well versed in this
// - our first useEffect is for loading our stories (non-expired) on mount
// - our second useEffect is for calculating the total storage size (in mb) of our stories array, whenever our stories array changes
// - our third function is for managing the upload of the images. 
// -- it converts an image file (only file type accepted) into base64
// -- it sets a max storage limit and checks that we haven't exceeded both already and with the new upload
// -- if it doesn't exceed in size, it sorts our arrays into unseen and seen, then appends it to the end of the unseen stories
// -- finally it gets pushed to our stories array and stored in local storage, thus correctly storing and organizing our images
// -- NOTE: there are 2 versions: one with the mb limit, and one with using URL for local sessions for testing as many stories as you want. the mb limit is very low, so use local URL for testing many stories
// - our fourth function sorts stories when we close our modal. this is to keep proper order of priority with earliest -> latest, unseen -> seen
// - our fifth function handles 'opening' our story which is called by our thumbnail 'story' component. It sets all the information we need to display the active story
// - our sixth function handles advancing the story and is called from our modal. It basically just pushes the index up by 1 and if we reach the end, closes the modal
// - our seventh function handles regressing our story and is also called from the modal. Same concept as progressing but does nothing when we hit the start
// - our eigth function handles deleting stories and is also called from the modal. Similar to what we've seen already it updates our stories array by filtering out the story with matching ID. 
// - our ninth function handles the 'alreadySeen' bool in our story object. Maps through our array, checking ID, and if it matches flips the already seen bool to true before updating our local storage with this info
// - our tenth function checks if a story has expired using luxon to calculate 24 hours ago and comparing if the date on our upload is more than 24 hours ago
// B1a. The story component is a simple little thumbnail that takes in all the information necessary to open it's corresponding story
// B1b. The image modal is where the second half of the magic happens and it also holds our loading bar, see function summary below
// - states note: first time using state array for individual progress bar loading.
// - our first useEffect is for handling time. Counting down, pausing, and what to do when it runs out.
// - our second function is for closing the modal effectively. There is a set series of steps to take when closing the modal and this puts them into once nice function
// - our third useEffect is for resetting story progress on close/open. For example, opening a middle story will show the previous as full and next as empty. Dont by mapping through and comparing indices, less = full more = empty
// - our fourth useEffect was to fix an incorrect amount of progress bars being shown, specifically the final bar was always full. The reason was it's rendering was delayed due to react loading, this fixes that.
// - our fourth function converts the milliseconds js Date() date to human understandable using luxon. Specifically it returns time as hour(s) ago.
// B1b1. The progress bar is just that - a basic progress bar, inspired by modern progress bar design
// B1c. The add story component is similar to story in that it's just a little thumbnail size with an input that only acceps images. Connects to our add story function in storyholder to upload stories 
// And that should cover the whole little program. Lots of notes throughout that should help show process and thoughts
// -
// After writing this up, I added a footer and a header that are very straightforward and don't affect project functionality

export default App
