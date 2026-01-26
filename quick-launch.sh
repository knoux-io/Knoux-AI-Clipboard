#!/bin/bash
# Knoux Clipboard AI - Quick Launch Script
# اسكريبت الإطلاق السريع لـ Knoux

echo "╔════════════════════════════════════════════════╗"
echo "║   🚀 Knoux Clipboard AI - Quick Launch        ║"
echo "║   إطلاق سريع لـ Knoux Clipboard AI            ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# تحديد نوع الإطلاق
if [ $# -eq 0 ]; then
    echo "استخدام: ./quick-launch.sh [option]"
    echo ""
    echo "الخيارات المتاحة:"
    echo "  dev     - تشغيل وضع التطوير (Development Mode)"
    echo "  build   - بناء التطبيق (Build Production)"
    echo "  dist    - حزم التطبيق (Package Application)"
    echo "  test    - تشغيل الاختبارات (Run Tests)"
    echo "  install - تثبيت الاعتماديات (Install Dependencies)"
    echo ""
    echo "مثال: ./quick-launch.sh dev"
    exit 1
fi

case $1 in
    dev)
        echo "✅ تشغيل وضع التطوير..."
        npm run dev
        ;;
    build)
        echo "✅ بناء التطبيق..."
        npm run build:renderer
        ;;
    dist)
        echo "✅ حزم التطبيق..."
        npm run dist
        ;;
    test)
        echo "✅ تشغيل الاختبارات..."
        npm test
        ;;
    install)
        echo "✅ تثبيت الاعتماديات..."
        npm install
        ;;
    *)
        echo "❌ خيار غير معروف: $1"
        exit 1
        ;;
esac

echo ""
echo "✅ تم الإنجاز بنجاح!"
