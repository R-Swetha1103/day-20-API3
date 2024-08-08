document.getElementById('fetch-data').addEventListener('click', function() {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
        .then(response => response.json())
        .then(data => {
            const collectionInfo = document.getElementById('collection-info');
            collectionInfo.innerHTML = ''; 

            if (data && data.objectIDs && data.objectIDs.length > 0) {
                const numberOfItems = Math.min(data.objectIDs.length, 10);
                for (let i = 0; i < numberOfItems; i++) {
                    const objectID = data.objectIDs[i];
                    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
                        .then(response => response.json())
                        .then(objectData => {
                            const { title, artistDisplayName, objectDate } = objectData;
                            const artworkHTML = `
                                <div class="artwork">
                                    <h6>${title || 'No Title'}</h6>
                                    <p><strong>Artist:</strong> ${artistDisplayName || 'Unknown'}</p>
                                    <p><strong>Date:</strong> ${objectDate || 'Unknown'}</p>
                                </div>
                            `;
                            collectionInfo.innerHTML += artworkHTML;
                        })
                        .catch(error => {
                            console.error('Error fetching object details:', error);
                        });
                }
            } else {
                collectionInfo.innerHTML = '<p>No data found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching collection data:', error);
            document.getElementById('collection-info').innerHTML = '<p>Failed to fetch data.</p>';
        });
});
