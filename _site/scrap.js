    /* 
        Makes an AJAX call to the Dataverse API to get a list of files
        Returns: an array of file objects in a given dataset
        Parameters:
            pid - the persistent ID for a dataset (String)
            baseUrl - the domain of the Dataverse instance (String)
            filetype (optional) - a string to filter files by content type, e.g. "image" or "pdf" (String)
    */
            function getFilesFromDataset(pid, baseUrl, filetype) {
                let url = baseUrl + "/api/datasets/:persistentId/?persistentId=" + pid // The url to make a request to
                $.ajax({
                    url: url,
                    type: "GET",
                    success: function(response) { 
                        let files = response['data']['latestVersion']['files'];
                        let arr = [];
                        for(file in files) { arr.push(files[file]) }
                        if (filetype !== undefined) {
                            return arr.filter(file => file.dataFile.contentType.includes(filetype));
                        } else {
                            return arr;
                        }
                    }
                });
            }