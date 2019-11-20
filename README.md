# Back-end

- You can access the server at `https://morning-sea-62543.herokuapp.com/`

- The following endpoints are available for now:

    - <b>[GET]</b> to `/api/stories
      - Name: Get all stories
      - Returns: Array of objects, each object is a story. Check endpoint to fetch stories by `id` below to know what properties are available to you.
    - <b>[GET]</b> to `/api/stories/:id`
        - Name: Get a story by `id`
        - Returns: Object with the following properties:
      
            - `id`: `Integer`. Story id. Autogenerated by server.
            - `title`: `String`. Title of the story. User input.
            - `story`: `String`. Text of the story. User input.
            - `date_trip`: `Timestamp`. Date that the trip took place. User input.
            - `created_at`: `Timestamp`. When the story was first created. Autogenerated by server.
            - `city`: `String`. City where the story takes place. User input.
            - `country`: `String`. Country where story takes place. User input.
            - `url`: `String`. Link to the photo. User input.
            - `description`: `String`. Description of the photo. User input.
        - Error: Returns error message if you are trying to fetch a non-existant `id`:
            - Example: `{"message": "Story 91 could not be found"}`
    - <b>[POST]</b>
    - <b>[DELETE]</b> to `/api/stories/:id`
        - Name: Delete a story by `id`
        - Returns: `{message: "Story has been deleted"}` if story and depending photo has been deleted or `{message: `There was a problem deleting story ${id}`}` if there was a problem.
