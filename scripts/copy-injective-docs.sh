#!/usr/bin/env bash
# extracts markdown files from specs directories of cosmos-sdk and injective-core repos,
# and places them within /developers-native/ in this repo

## config
injective_core_branch=master
cosmos_sdk_branch=v0.50.x-inj
SCRIPTS_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
echo "SCRIPTS_DIR=${SCRIPTS_DIR}"
DIR=$( cd -- "${SCRIPTS_DIR}/../.gitbook" &> /dev/null && pwd )
BUILD_DIR="${SCRIPTS_DIR}/temp"
STUB_DIR="${SCRIPTS_DIR}/stub"
CORE_DIR="${DIR}/developers-native/core"
INJECTIVE_DIR="${DIR}/developers-native/injective"
SKIP_CLONE=""
SKIP_TEARDOWN=""
echo "BUILD_DIR=${BUILD_DIR}"
echo "STUB_DIR=${STUB_DIR}"
echo "CORE_DIR=${CORE_DIR}"
echo "INJECTIVE_DIR=${INJECTIVE_DIR}"

mkdir -p $BUILD_DIR
rm -rf $CORE_DIR
rm -rf $INJECTIVE_DIR
mkdir -p $CORE_DIR
mkdir -p $INJECTIVE_DIR

## clone repos
if [ "$GH_CORE_USER" ] && [ "$GH_CORE_TOKEN" ]; then
  echo "Using GitHub credentials for cloning injective-core"
  INJ_CORE_GIT_URL="https://${GH_CORE_USER}:${GH_CORE_TOKEN}@github.com/InjectiveLabs/injective-core.git"
else
  echo "Using org access to clone injective-core"
  INJ_CORE_GIT_URL="org-44571224@github.com:InjectiveLabs/injective-core.git"
fi
if [ "${SKIP_CLONE}" = "true" ]; then
  git clone "${INJ_CORE_GIT_URL}" "${BUILD_DIR}/injective-core" \
    -b "${injective_core_branch}" \
    --depth 1 \
    --single-branch > /dev/null
else
  echo "SKIPPED: clone of injective-core"
fi

echo "Cloning cosmos-sdk..."
if [ "${SKIP_CLONE}" = "true" ]; then
  git clone "https://github.com/InjectiveLabs/cosmos-sdk.git" "${BUILD_DIR}/cosmos-sdk" \
    -b "${cosmos_sdk_branch}" \
    --depth 1 \
    --single-branch > /dev/null
else
  echo "SKIPPED: clone of cosmos-sdk"
fi

## Generate errors docs
./$BUILD_DIR/injective-core/scripts/docs/generate_errors_docs.sh

## copy from the cosmos-sdk repo files x/*/README.md into this repo
echo "===CORE_DIR==="
ls $BUILD_DIR/cosmos-sdk/x/*
for D in $BUILD_DIR/cosmos-sdk/x/*; do
  if [ -d "${D}" ]; then
    mkdir -p "$CORE_DIR/$(echo $D | awk -F/ '{print $NF}')" && \
      cp -r $D/README.md "$_/index.md" && \
      rm "$_/index.mde*"
  fi
done

## copy from the injective-core repo files injective-chain/modules/*/spec/* into this repo
echo "===INJECTIVE_DIR==="
ls $BUILD_DIR/injective-core/injective-chain/modules/*
for D in $BUILD_DIR/injective-core/injective-chain/modules/*; do
  if [ -d "${D}" ]; then
    mkdir -p "$INJECTIVE_DIR/$(echo $D | awk -F/ '{print $NF}')" && \
      cp -r $D/spec/* "$_" && \
      mv "$_/README.md" "$_/index.md" && \
      rm "$_/index.mde*"
  fi
done

## txfees
cp $BUILD_DIR/injective-core/injective-chain/modules/txfees/README.md $INJECTIVE_DIR/txfees/index.md
## lanes
mkdir -p $INJECTIVE_DIR/lanes
cp $BUILD_DIR/injective-core/injective-chain/lanes/spec/README.md $INJECTIVE_DIR/lanes/index.md

## Manually replace wrong relative paths for links

### authz
search1="(../modules/auth/)"
replace1="(../auth/)"
FILES=$( find $CORE_DIR/authz -type f )
for file in $FILES
do
	sed -ie "s/${search1//\//\\/}/${replace1//\//\\/}/g" $file
done

### auth
search2="(../modules/authz/)"
replace2="(../authz/)"
FILES=$( find $CORE_DIR/auth -type f )
for file in $FILES
do
	sed -ie "s/${search2//\//\\/}/${replace2//\//\\/}/g" $file
done

### READMEs
FILES=$( find $CORE_DIR/ -type f )
for file in $FILES
do
	sed -ie "s/\/README\.md/\//g" $file
done

## stubs
cp $STUB_DIR/core.modules.md.stub $CORE_DIR/index.md
cp $STUB_DIR/injective.modules.md.stub $INJECTIVE_DIR/index.md

## tear down
echo "Clean up..."
if [ "${SKIP_TEARDOWN}" = "true" ]; then
  rm -rf $BUILD_DIR $STUB_DIR
else
  echo "SKIPPED: clone of BUILD_DIR and STUB_DIR"
fi