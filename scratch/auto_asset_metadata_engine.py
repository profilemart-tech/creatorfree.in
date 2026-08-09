import os
import subprocess
import json

class AutoAssetMetadataEngine:
    ORGANIZATION = "CreatorsFree.in"
    COPYRIGHT = "© 2026 CreatorsFree.in - All Rights Reserved"
    ALBUM_VFX = "CF Series VFX Overlays"
    ALBUM_SFX = "CF Series Sound Effects"
    ALBUM_VEC = "CF Series Vector Assets"

    @staticmethod
    def tag_video_mp4(input_mp4, output_mp4, title, content_id, comment=None):
        """Automatically embeds FFmpeg MP4 binary container metadata and ownership tags."""
        cmd = [
            'ffmpeg', '-y',
            '-i', input_mp4,
            '-c', 'copy',
            '-metadata', f'title={title} ({AutoAssetMetadataEngine.ORGANIZATION})',
            '-metadata', f'artist={AutoAssetMetadataEngine.ORGANIZATION}',
            '-metadata', f'album={AutoAssetMetadataEngine.ALBUM_VFX}',
            '-metadata', f'copyright={AutoAssetMetadataEngine.COPYRIGHT}',
            '-metadata', f'comment={comment or title} (Content ID: {content_id})',
            output_mp4
        ]
        subprocess.run(cmd, check=True)
        print(f"[AUTO-TAG ENGINE] Tagged MP4 Video: {output_mp4} (ID: {content_id})")

    @staticmethod
    def tag_svg_vector(input_svg_path, title, content_id):
        """Automatically embeds XML metadata tags into SVG vector files."""
        with open(input_svg_path, 'r', encoding='utf-8') as f:
            content = f.read()

        meta_block = f"""  <metadata id="cf-metadata">
    <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <rdf:Description rdf:about="">
        <dc:title>{title}</dc:title>
        <dc:creator>{AutoAssetMetadataEngine.ORGANIZATION}</dc:creator>
        <dc:rights>{AutoAssetMetadataEngine.COPYRIGHT}</dc:rights>
        <dc:identifier>{content_id}</dc:identifier>
      </rdf:Description>
    </rdf:RDF>
  </metadata>\n"""
        
        if '<metadata' not in content:
            content = content.replace('<svg ', '<svg ' + meta_block, 1)
            with open(input_svg_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"[AUTO-TAG ENGINE] Tagged SVG Vector: {input_svg_path} (ID: {content_id})")

if __name__ == "__main__":
    print("CreatorsFree.in Automatic Asset Metadata Engine Initialized.")
