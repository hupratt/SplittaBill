import boto3
import botocore
import os
import uuid


s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
    endpoint_url=os.environ.get("S3_CUSTOM_URL")
)

ALLOWED_EXTENTIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENTIONS

def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://minio-api.thekor.eu/{BUCKET_NAME}/"

def upload_file_to_s3(file):
    print(f"file: {file}, bucket: {BUCKET_NAME}, location: {S3_LOCATION}")

    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}