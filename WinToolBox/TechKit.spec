# -*- mode: python ; coding: utf-8 -*-
import os

block_cipher = None

a = Analysis(
    ['main.py'],
    pathex=['.'],
    binaries=[],
    datas=[
        ('assets', 'assets'),
    ],
    hiddenimports=[
        # Core
        'psutil',
        'psutil._pswindows',
        'PIL',
        'PIL.Image',
        'customtkinter',
        'pycryptodome',
        'Crypto',
        'Crypto.Cipher',
        'Crypto.Cipher.AES',
        'Crypto.Util',
        'Crypto.Util.Counter',
        'requests',
        'winreg',
        # Módulos TechKit
        'modules.cleaner.controller',
        'modules.cleaner.view',
        'modules.performance.controller',
        'modules.performance.view',
        'modules.network.controller',
        'modules.network.view',
        'modules.sysinfo.controller',
        'modules.sysinfo.view',
        'modules.updates.controller',
        'modules.updates.view',
        'modules.privacy.controller',
        'modules.privacy.view',
        'modules.repair.controller',
        'modules.repair.view',
        'modules.usbrepair.controller',
        'modules.usbrepair.view',
        'modules.regcleaner.controller',
        'modules.regcleaner.view',
        # Core
        'core.logger',
        'core.uac',
        'core.worker',
        'core.mega_downloader',
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=['tkinter.test', 'unittest'],
    noarchive=False,
    optimize=1,
)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='TechKit',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=False,                  # Sin ventana CMD
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
    uac_admin=True,                 # Solicita admin automáticamente
    icon='assets/logo-.png',        # Ícono del exe
)
