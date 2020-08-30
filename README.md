# liveframe
Digital media frame environment

## Contents
- liveframe-ui-web: website to be displayed on RPi frames
- liveframe-server: server which maintains all content

## TODO
- [ ] move to k8s cluster
- [x] add image service
- [x] add realtime clock in bottom bar
- [x] test image service
- [ ] frontend for image upload

## Notes
- Image upload works well for now. Properly requires authentication and saves original photo to device. Frontend should allow more control over cropping as it now just takes the middle of the image.
- Maybe use sockets to control when restarts can happen?