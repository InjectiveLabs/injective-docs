#!/usr/bin/env bash
injective_core_branch=dev
cosmos_sdk_branch=v0.50.x-inj
BUILD_DIR=./temp
STUB_DIR=./scripts/stub
CORE_DIR=./docs/develop/modules/core
INJECTIVE_DIR=./docs/develop/modules/injective

mkdir -p $BUILD_DIR
rm -rf $CORE_DIR
rm -rf $INJECTIVE_DIR
mkdir $CORE_DIR
mkdir $INJECTIVE_DIR

git clone https://github.com/InjectiveLabs/injective-core.git $BUILD_DIR/injective-core -b $injective_core_branch --depth 1 --single-branch > /dev/null
git clone https://github.com/InjectiveLabs/cosmos-sdk.git $BUILD_DIR/cosmos-sdk -b $cosmos_sdk_branch --depth 1 --single-branch > /dev/null

for D in ./$BUILD_DIR/cosmos-sdk/x/*; do
  if [ -d "${D}" ]; then
    mkdir -p "$CORE_DIR/$(echo $D | awk -F/ '{print $NF}')" && cp -r $D/README.md "$_"
  fi
done

for D in ./$BUILD_DIR/injective-core/injective-chain/modules/*; do
  if [ -d "${D}" ]; then
    mkdir -p "$INJECTIVE_DIR/$(echo $D | awk -F/ '{print $NF}')" && cp -r $D/spec/* "$_"
  fi
done

cp $STUB_DIR/core_category.json.stub $CORE_DIR/_category_.json
cp $STUB_DIR/core_index.mdx.stub $CORE_DIR/index.mdx
cp $STUB_DIR/injective_category.json.stub $INJECTIVE_DIR/_category_.json
cp $STUB_DIR/injective_index.mdx.stub $INJECTIVE_DIR/index.mdx

## 1. Manually replace wrong import paths
## authz
search1="(../modules/auth/)"
replace1="(../auth/)"

FILES=$( find $CORE_DIR/authz -type f )

for file in $FILES
do
	sed -ie "s/${search1//\//\\/}/${replace1//\//\\/}/g" $file
done

## auth
search2="(../modules/authz/)"
replace2="(../authz/)"

FILES=$( find $CORE_DIR/auth -type f )

for file in $FILES
do
	sed -ie "s/${search2//\//\\/}/${replace2//\//\\/}/g" $file
done

rm $CORE_DIR/authz/README.mde
rm $CORE_DIR/auth/README.mde
rm -rf $BUILD_DIR
