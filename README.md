The development branch for NovaFit. Once things are finalized will be moved to main branch.

#### Getting Started 🚀
To get the project running on your local machine:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```                            
clone == to copy a remote repository to your local machine for the first time.

3. Install dependencies:
You'll need Node.js and npm to get started.                                                       
Then, navigate to the project directory and install all the dependencies by running:
  ```
    cd NovaFit
    npm install
   ```
#### Project Structure 📁
Here’s how the project is organized:  
```
/NovaFit                                                              
      /frontend
          /src
            /App
            /Components #contains diff components of web app                                    
      /backend
          /server  
```
#### Git Workflow 👨‍💻👩‍💻
Here’s how we’ll work with Git:

Pull the latest changes from development before you start working:
  ```
  git checkout development
  git pull origin development
  ```

Create and switch to a new branch for your feature or fix:
  ```
  git checkout -b my-new-feature
  ```

Start working on your task.                               
Once you're done with the changes, commit them to the new branch:
  ```
  git add .
  git commit -m "_description_"
  ```

Push your branch to the remote repository:
  ```
  git push origin feature/my-new-feature
  ```

Once your work is ready and tested, create a Pull Request (PR) to merge new branch back into the development branch. 
This allows others to review your code before it gets merged.


