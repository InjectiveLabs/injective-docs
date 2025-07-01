#!/usr/bin/env bash
injective_core_branch=master
cosmos_sdk_branch=v0.50.x-inj
BUILD_DIR=./temp
STUB_DIR=./scripts/stub
CORE_DIR=./.gitbook/developers-native/core
INJECTIVE_DIR=./.gitbook/developers-native/injective

mkdir -p $BUILD_DIR
rm -rf $CORE_DIR
rm -rf $INJECTIVE_DIR
mkdir $CORE_DIR
mkdir $INJECTIVE_DIR

if [ "$GH_CORE_USER" ] && [ "$GH_CORE_TOKEN" ]; then
    echo "Using GitHub credentials for cloning injective-core"
    git clone https://$GH_CORE_USER:$GH_CORE_TOKEN@github.com/InjectiveLabs/injective-core.git $BUILD_DIR/injective-core -b $injective_core_branch --depth 1 --single-branch > /dev/null
else
    echo "Using public access to clone injective-core"
    git clone https://github.com/InjectiveFoundation/injective-core.git $BUILD_DIR/injective-core -b $injective_core_branch --depth 1 --single-branch > /dev/null
fi

echo "Cloning cosmos-sdk..."
git clone https://github.com/InjectiveLabs/cosmos-sdk.git $BUILD_DIR/cosmos-sdk -b $cosmos_sdk_branch --depth 1 --single-branch > /dev/null

## Generate errors docs
./$BUILD_DIR/injective-core/scripts/docs/generate_errors_docs.sh

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

## txfees
cp $BUILD_DIR/injective-core/injective-chain/modules/txfees/README.md $INJECTIVE_DIR/txfees/README.md
## lanes
mkdir -p $INJECTIVE_DIR/lanes
cp $BUILD_DIR/injective-core/injective-chain/lanes/spec/README.md $INJECTIVE_DIR/lanes/README.md

cp $STUB_DIR/core.modules.md.stub $CORE_DIR/README.md
cp $STUB_DIR/injective.modules.md.stub $INJECTIVE_DIR/README.md

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
