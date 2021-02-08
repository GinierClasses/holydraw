# Thyrel team - database reconstructor/reloader script
# this script will remove the projects images and rebuild them
# USE THIS SCRIPT EACH TIME YOU MODIFY THE DATABASE'S STRUCTURE
# ---
# Version 1 - 27.01.2021
# --------------------------------------------------------------
# Notice : Please execute it in the project's folder otherwise it won't work
# since it uses docker commands that will be executed locally.
# --------------------------------------------------------------

if ! [[ "$(command -v docker)" ]]; then
   echo -e "\e[31mWARNING:\e[39m docker is not installed";
   echo -e "\e[34mCOMMAND:\e[39m sudo apt install docker / brew install docker";
   exit 1;
fi

if ! [[ "$(command -v docker-compose)" ]]; then
   echo -e "\e[31mWARNING:\e[39m docker-compose is not installed";
   echo -e "\e[34mCOMMAND:\e[39m please install docker composeß";
   exit 1;
fi

read -p "Are you sure to do that? your images will be redownloaded. [Y/n]" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

docker container rm dev_mysql
docker container rm dev_pma

docker-compose up 

echo
echo "Done !"