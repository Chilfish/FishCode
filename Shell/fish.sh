packs=("aliyun-python-sdk-core" "aliyun-python-sdk-core-v3" "aliyun-python-sdk-kms")

for pack in ${packs[@]}
do
  echo "pip uninstall ${pack}"
done
